/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

// --- Audio Helper ---
let audioCtx: AudioContext | null = null;
const playSound = (type: 'ding' | 'success' | 'win', isMuted: boolean) => {
  if (isMuted) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'ding') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === 'success') {
    osc.type = 'triangle';
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const o = audioCtx!.createOscillator();
      const g = audioCtx!.createGain();
      o.connect(g);
      g.connect(audioCtx!.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, audioCtx!.currentTime + i * 0.05);
      g.gain.setValueAtTime(0, audioCtx!.currentTime + i * 0.05);
      g.gain.linearRampToValueAtTime(0.1, audioCtx!.currentTime + i * 0.05 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.01, audioCtx!.currentTime + i * 0.05 + 0.2);
      o.start(audioCtx!.currentTime + i * 0.05);
      o.stop(audioCtx!.currentTime + i * 0.05 + 0.3);
    });
  } else if (type === 'win') {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    notes.forEach((freq, i) => {
      const o = audioCtx!.createOscillator();
      const g = audioCtx!.createGain();
      o.connect(g);
      g.connect(audioCtx!.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, audioCtx!.currentTime + i * 0.1);
      g.gain.setValueAtTime(0, audioCtx!.currentTime + i * 0.1);
      g.gain.linearRampToValueAtTime(0.1, audioCtx!.currentTime + i * 0.1 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.01, audioCtx!.currentTime + i * 0.1 + 0.5);
      o.start(audioCtx!.currentTime + i * 0.1);
      o.stop(audioCtx!.currentTime + i * 0.1 + 0.6);
    });
  }
};

// --- Components ---

interface JarProps {
  id: number;
  target: number;
  current: number;
  color: string;
  isComplete: boolean;
}

const Jar = ({ target, current, color, isComplete }: JarProps) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[180px]">
      <div className="text-3xl md:text-5xl font-black mb-1 md:mb-2" style={{ color }}>{target}</div>
      <motion.div 
        className={`relative w-full aspect-[1/1.3] bg-white/80 border-[4px] md:border-[8px] rounded-t-[20px] md:rounded-t-[30px] rounded-b-[40px] md:rounded-b-[60px] flex flex-wrap-reverse content-start justify-center p-1 md:p-2 transition-all duration-300`}
        style={{ 
          borderColor: isComplete ? 'var(--success)' : color,
          backgroundColor: isComplete ? '#DCFCE7' : 'rgba(255, 255, 255, 0.8)'
        }}
        animate={isComplete ? { scale: [1, 1.05, 1], boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' } : {}}
      >
        {Array.from({ length: current }).map((_, i) => (
          <motion.div 
            key={i} 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-2xl md:text-4xl m-0.5"
          >
            💰
          </motion.div>
        ))}
      </motion.div>
      <div className={`mt-2 md:mt-4 font-bold text-xs md:text-xl px-2 md:px-4 py-0.5 md:py-1 rounded-full bg-slate-200 ${isComplete ? 'text-green-600' : 'text-slate-700'}`}>
        {current} / {target}
      </div>
    </div>
  );
};

export default function App() {
  const [jarCounts, setJarCounts] = useState<number[]>([0, 0, 0, 0, 0]);
  const [coins, setCoins] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const jarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const targets = [1, 2, 3, 4, 5];
  const jarColors = ['var(--jar-red)', 'var(--jar-blue)', 'var(--jar-green)', 'var(--jar-orange)', 'var(--jar-purple)'];

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setJarCounts([0, 0, 0, 0, 0]);
    setShowWin(false);
    const newCoins = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      // Use percentages for easier responsive absolute positioning
      left: 10 + Math.random() * 80, 
      top: 15 + Math.random() * 70,
    }));
    setCoins(newCoins);
  };

  const handleDragEnd = (coinId: number, info: any) => {
    const point = { x: info.point.x, y: info.point.y };
    let droppedInJarIndex = -1;

    jarRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (
          point.x >= rect.left &&
          point.x <= rect.right &&
          point.y >= rect.top &&
          point.y <= rect.bottom
        ) {
          droppedInJarIndex = index;
        }
      }
    });

    if (droppedInJarIndex !== -1) {
      const target = targets[droppedInJarIndex];
      const current = jarCounts[droppedInJarIndex];

      if (current < target) {
        // Success!
        const newCounts = [...jarCounts];
        newCounts[droppedInJarIndex]++;
        setJarCounts(newCounts);
        setCoins(prev => prev.filter(c => c.id !== coinId));
        playSound('ding', isMuted);

        if (newCounts[droppedInJarIndex] === target) {
          playSound('success', isMuted);
          if (newCounts.every((count, i) => count === targets[i])) {
            setTimeout(() => {
              setShowWin(true);
              playSound('win', isMuted);
            }, 500);
          }
        }
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-between p-4 md:p-12 overflow-hidden select-none touch-none">
      <header className="w-full flex flex-col md:flex-row justify-between items-center max-w-6xl mb-4 md:mb-8 gap-4">
        <h1 className="text-3xl md:text-6xl font-extrabold text-[#7C3AED] drop-shadow-sm text-center md:text-left">
          Counting Fun!
        </h1>
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2 bg-slate-300 hover:bg-slate-400 text-slate-700 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-lg transition-transform active:scale-95 shadow-sm"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-base md:text-xl transition-transform active:scale-95 shadow-md"
          >
            <RotateCcw size={20} />
            Start Over
          </button>
        </div>
      </header>

      {/* Coin Source Area */}
      <div className="w-full max-w-5xl h-32 md:h-44 bg-white/50 border-4 border-dashed border-[#D1D5DB] rounded-[32px] relative mb-4 md:mb-8 overflow-hidden">
        <AnimatePresence>
          {coins.map((coin) => (
            <motion.div
              key={coin.id}
              drag
              dragMomentum={false}
              dragSnapToOrigin={true}
              onDragEnd={(_, info) => handleDragEnd(coin.id, info)}
              initial={{ scale: 0 }}
              animate={{ scale: 1, left: `${coin.left}%`, top: `${coin.top}%` }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.2, zIndex: 50 }}
              className="absolute text-4xl md:text-5xl cursor-grab active:cursor-grabbing p-2 drop-shadow-[0_4px_0_#B45309] -translate-x-1/2 -translate-y-1/2"
              style={{ touchAction: 'none' }}
            >
              💰
            </motion.div>
          ))}
        </AnimatePresence>
        {coins.length === 0 && !showWin && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-lg md:text-xl">
            Out of coins! Reset to get more.
          </div>
        )}
      </div>

      {/* Jars Area */}
      <div className="w-full max-w-7xl flex gap-1 md:gap-8 items-end justify-center mb-6 md:mb-12">
        {targets.map((target, i) => (
          <div key={i} ref={el => jarRefs.current[i] = el} className="flex-1 max-w-[120px] md:max-w-[200px]">
            <Jar 
              id={i}
              target={target}
              current={jarCounts[i]}
              color={jarColors[i]}
              isComplete={jarCounts[i] === target}
            />
          </div>
        ))}
      </div>

      {/* Win Overlay */}
      <AnimatePresence>
        {showWin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#7C3AED]/90 z-[100] flex flex-col items-center justify-center text-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="relative"
            >
              <h2 className="text-7xl md:text-9xl font-black text-white mb-12 drop-shadow-[0_10px_0_rgba(0,0,0,0.2)]">
                YOU DID IT!
              </h2>
              <button 
                onClick={resetGame}
                className="bg-white text-[#7C3AED] px-16 py-6 rounded-full font-black text-4xl transition-transform active:scale-95 shadow-2xl hover:bg-slate-100"
              >
                Play Again!
              </button>
            </motion.div>
            
            {/* Simple Confetti-like elements */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth - window.innerWidth / 2, 
                  y: -window.innerHeight,
                  rotate: 0 
                }}
                animate={{ 
                  y: window.innerHeight,
                  rotate: 360,
                  x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth - window.innerWidth / 2)
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                className="absolute w-4 h-4 rounded-sm"
                style={{ 
                  backgroundColor: ['#f87171', '#60a5fa', '#facc15', '#4ade80', '#c084fc'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
