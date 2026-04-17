/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCcw, ArrowLeftRight } from 'lucide-react';

export default function App() {
  const [myCookies, setMyCookies] = useState(2);
  const [otherCookies, setotherCookies] = useState(3);
  const [isEqual, setIsEqual] = useState(false);
  const [celebration, setCelebration] = useState(false);

  // Web Audio API for the "ding" sound
  const playDing = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.5); // A4

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  useEffect(() => {
    const equal = myCookies === otherCookies;
    if (equal && !isEqual) {
      setIsEqual(true);
      setCelebration(true);
      playDing();
      // Auto-hide celebration after some time? No, let it stay until they move again.
    } else if (!equal) {
      setIsEqual(false);
      setCelebration(false);
    }
  }, [myCookies, otherCookies, isEqual, playDing]);

  const moveCookieToOther = () => {
    if (myCookies > 0) {
      setMyCookies(prev => prev - 1);
      setotherCookies(prev => prev + 1);
    }
  };

  const moveCookieToMe = () => {
    if (otherCookies > 0) {
      setotherCookies(prev => prev - 1);
      setMyCookies(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setMyCookies(2);
    setotherCookies(3);
    setIsEqual(false);
    setCelebration(false);
  };

  const getStatusMessage = () => {
    if (isEqual) return "EQUAL! Great sharing!";
    if (myCookies > otherCookies) return "I have MORE cookies!";
    return "The other plate has MORE cookies!";
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 flex flex-col items-center justify-center p-4 font-sans ${celebration ? 'bg-green-100' : 'bg-blue-50'}`}>
      
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8 max-w-2xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          Cookie Sharing Fun! 🍪
        </h1>
        <p className="text-xl text-blue-600 font-medium leading-relaxed">
          Who has MORE cookies? Who has LESS?<br />
          How can we make them EQUAL?
        </p>
      </motion.div>

      {/* Status Message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={getStatusMessage()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`text-2xl md:text-3xl font-bold mb-12 px-8 py-4 rounded-full shadow-lg ${isEqual ? 'bg-green-500 text-white' : 'bg-white text-blue-700'}`}
        >
          {getStatusMessage()}
        </motion.div>
      </AnimatePresence>

      {/* Plates Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center mb-12 w-full max-w-4xl">
        
        {/* My Plate */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.div 
              animate={celebration ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full border-8 border-blue-200 shadow-inner flex flex-wrap items-center justify-center p-6 gap-2 overflow-hidden"
            >
              <AnimatePresence>
                {Array.from({ length: myCookies }).map((_, i) => (
                  <motion.span
                    key={`my-cookie-${i}`}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, x: 100, opacity: 0 }}
                    className="text-4xl md:text-5xl select-none cursor-default"
                  >
                    🍪
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-800">My Plate</h2>
            <p className="text-xl font-semibold text-blue-500">{myCookies} cookies</p>
          </div>
        </div>

        {/* Other Plate */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.div 
              animate={celebration ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full border-8 border-pink-200 shadow-inner flex flex-wrap items-center justify-center p-6 gap-2 overflow-hidden"
            >
              <AnimatePresence>
                {Array.from({ length: otherCookies }).map((_, i) => (
                  <motion.span
                    key={`other-cookie-${i}`}
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, x: -100, opacity: 0 }}
                    className="text-4xl md:text-5xl select-none cursor-default"
                  >
                    🍪
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-pink-800">Other Plate</h2>
            <p className="text-xl font-semibold text-pink-500">{otherCookies} cookies</p>
          </div>
        </div>

      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={moveCookieToOther}
          disabled={myCookies === 0}
          className="flex items-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-xl font-bold shadow-lg transition-all active:scale-95"
        >
          <ArrowLeftRight className="w-6 h-6" />
          Move cookie to Other Plate
        </button>
        <button
          onClick={moveCookieToMe}
          disabled={otherCookies === 0}
          className="flex items-center gap-2 px-6 py-4 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-xl font-bold shadow-lg transition-all active:scale-95"
        >
          <ArrowLeftRight className="w-6 h-6" />
          Move cookie to Me
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-lg font-semibold transition-all active:scale-95"
      >
        <RefreshCcw className="w-5 h-5" />
        Start Over
      </button>

      {/* Sparkles for celebration */}
      {celebration && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 100,
                scale: Math.random() * 0.5 + 0.5,
                opacity: 1
              }}
              animate={{ 
                y: -100,
                rotate: 360,
                opacity: 0
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute text-2xl"
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
