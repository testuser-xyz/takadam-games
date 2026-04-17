import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw, Star } from 'lucide-react';

// --- Audio Helper ---
let audioCtx: AudioContext | null = null;
const playSound = (type: 'pop' | 'ding' | 'error' | 'win', isMuted: boolean) => {
  if (isMuted) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'pop') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === 'ding') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === 'error') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, audioCtx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
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

// --- Types ---
type ColorData = {
  id: string;
  name: string;
  hex: string;
};

const COLORS: ColorData[] = [
  { id: 'red', name: 'Red', hex: '#FF6B6B' },
  { id: 'blue', name: 'Blue', hex: '#4ECDC4' },
  { id: 'yellow', name: 'Yellow', hex: '#FFE66D' },
  { id: 'green', name: 'Green', hex: '#A8E6CF' }
];

const ColorSplashMatchApp: React.FC = () => {
  const [blobs, setBlobs] = useState<{ id: string; color: ColorData; left: number; top: number }[]>([]);
  const [, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [errorBlobId, setErrorBlobId] = useState<string | null>(null);
  
  const bucketRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize game
  const resetGame = () => {
    setScore(0);
    setShowWin(false);
    setErrorBlobId(null);
    
    // Create 2 blobs of each color
    const newBlobs: { id: string; color: ColorData; left: number; top: number }[] = [];
    COLORS.forEach(color => {
      for (let i = 0; i < 2; i++) {
        newBlobs.push({
          id: `${color.id}-${i}`,
          color,
          left: 10 + Math.random() * 80, // Random positions %
          top: 15 + Math.random() * 70
        });
      }
    });
    
    // Shuffle
    setBlobs(newBlobs.sort(() => Math.random() - 0.5));
    playSound('pop', isMuted);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleDragEnd = (blobId: string, colorId: string, info: any) => {
    const point = { x: info.point.x, y: info.point.y };
    let droppedInBucketId: string | null = null;

    bucketRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (
          point.x >= rect.left &&
          point.x <= rect.right &&
          point.y >= rect.top &&
          point.y <= rect.bottom
        ) {
          droppedInBucketId = COLORS[index].id;
        }
      }
    });

    if (droppedInBucketId) {
      if (droppedInBucketId === colorId) {
        // Correct match!
        playSound('ding', isMuted);
        setBlobs(prev => prev.filter(b => b.id !== blobId));
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore === COLORS.length * 2) {
            setShowWin(true);
            setTimeout(() => playSound('win', isMuted), 300);
          }
          return newScore;
        });
      } else {
        // Incorrect match
        playSound('error', isMuted);
        setErrorBlobId(blobId);
        setTimeout(() => setErrorBlobId(null), 500); // Reset error shake
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden select-none touch-none font-sans">
      {/* Header */}
      <header className="w-full flex flex-col md:flex-row justify-between items-center max-w-5xl mb-4 gap-4 pt-12 md:pt-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#FF6B6B] drop-shadow-sm text-center md:text-left">
          Color Splash!
        </h1>
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-slate-700 px-4 py-2 md:py-3 rounded-full font-bold text-sm md:text-lg transition-transform active:scale-95 shadow-sm"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 bg-[#4ECDC4] hover:bg-[#3dbdb4] text-white px-6 py-2 md:py-3 rounded-full font-bold text-base md:text-xl transition-transform active:scale-95 shadow-md"
          >
            <RotateCcw size={20} />
            Start Over
          </button>
        </div>
      </header>

      {/* Success Modal */}
      <AnimatePresence>
        {showWin && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center border-4 border-[#FF6B6B]">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-24 h-24 text-[#FFE66D] fill-[#FFE66D]" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-[#FF6B6B] mt-6 mb-8 text-center">
                Great Job!
              </h2>
              <button 
                onClick={resetGame}
                className="bg-[#FF6B6B] text-white px-8 py-4 rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-lg"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blob Area */}
      <div className="w-full max-w-5xl h-48 md:h-64 bg-white border-4 border-dashed border-gray-300 rounded-[32px] relative mb-8 overflow-hidden shadow-inner">
        <AnimatePresence>
          {blobs.map((blob) => (
            <motion.div
              key={blob.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              onDragEnd={(_, info) => handleDragEnd(blob.id, blob.color.id, info)}
              initial={{ scale: 0, x: `${blob.left}%`, y: `${blob.top}%` }}
              animate={{ 
                scale: 1, 
                x: `${blob.left}%`, 
                y: `${blob.top}%`,
                rotate: errorBlobId === blob.id ? [-10, 10, -10, 10, 0] : 0 
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileDrag={{ scale: 1.2, zIndex: 50, cursor: 'grabbing' }}
              className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full cursor-grab flex items-center justify-center shadow-lg"
              style={{ 
                backgroundColor: blob.color.hex,
                border: `4px solid ${blob.color.hex}80` 
              }}
            >
              {/* Cute face on the blob */}
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-black/60 rounded-full" />
                <div className="w-2 h-2 bg-black/60 rounded-full" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {blobs.length === 0 && !showWin && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-2xl">
            All sorted!
          </div>
        )}
      </div>

      {/* Buckets/Targets Area */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pb-4">
        {COLORS.map((color, index) => (
          <div 
            key={color.id}
            ref={(el) => { bucketRefs.current[index] = el; }}
            className="flex flex-col items-center"
          >
            <div 
              className="w-full aspect-square rounded-[32px] md:rounded-[40px] border-8 flex items-center justify-center bg-white/50 shadow-sm transition-transform duration-300"
              style={{ borderColor: color.hex }}
            >
              <div 
                className="w-1/2 aspect-square rounded-full opacity-50"
                style={{ backgroundColor: color.hex }}
              />
            </div>
            <span 
              className="mt-4 font-black text-xl md:text-3xl tracking-wide uppercase"
              style={{ color: color.hex }}
            >
              {color.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSplashMatchApp;
