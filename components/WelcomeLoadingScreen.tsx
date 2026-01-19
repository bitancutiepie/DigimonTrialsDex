
import React, { useState, useEffect } from 'react';
import { Monitor, Cpu, Database, Wifi, Zap, Terminal, Activity } from 'lucide-react';

interface WelcomeLoadingScreenProps {
  onEnter: () => void;
}

const WelcomeLoadingScreen: React.FC<WelcomeLoadingScreenProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [bootStage, setBootStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const bootMessages = [
    "LOADING SYSTEM...",
    "SYNCING SECTORS...",
    "PARSING DATA...",
    "DECRYPTING...",
    "FINALIZING...",
    "READY."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1.2;
      });
    }, 25);

    const stageTimer = setInterval(() => {
      setBootStage((prev) => (prev < bootMessages.length - 1 ? prev + 1 : prev));
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(stageTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0f172a] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Main Terminal Box */}
      <div className="relative w-full max-w-2xl bg-slate-900 border-4 sm:border-8 border-white shadow-[12px_12px_0_#007FFF] p-6 sm:p-10 flex flex-col items-center gap-8 z-10">
        
        {/* Decorative Corner Elements */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-none animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-none"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-none"></div>
        </div>
        <div className="absolute top-3 right-3 p-1">
           <Zap className="w-5 h-5 text-orange-500" />
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-cyan-400">
            <Monitor className="w-10 h-10 sm:w-16 h-16" />
            <h1 className="text-5xl sm:text-7xl font-black font-digital tracking-tighter text-white drop-shadow-[4px_4px_0_#007FFF] uppercase">
              DIGIDEX
            </h1>
          </div>
          <p className="text-[10px] sm:text-xs font-black text-cyan-400 uppercase tracking-[0.4em] animate-pulse">
            DIGITAL MONITOR
          </p>
        </div>

        {/* Attribution Message */}
        <div className="w-full bg-slate-800 border-2 border-cyan-400/30 p-4 text-center">
          <div className="text-xs sm:text-sm font-bold text-white leading-relaxed">
            ACCESS: <span className="text-orange-500">GRANTED</span>
            <br />
            DATABASE: <span className="text-cyan-400">DIGIMON TRIALS</span>
          </div>
        </div>

        {/* Loading / Action Area */}
        <div className="w-full space-y-6">
          {!isLoaded ? (
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  {bootMessages[bootStage]}
                </span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="h-4 w-full border-2 border-white/20 p-0.5 bg-slate-800">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onEnter}
              className="w-full bg-cyan-600 border-4 border-white text-white py-4 text-xl font-black font-digital uppercase tracking-widest hover:bg-cyan-500 transition-all animate-pulse shadow-[8px_8px_0_#0f172a] active:translate-y-1 active:shadow-none"
            >
              ACCESS SYSTEM
            </button>
          )}
        </div>

        {/* Footer Stats */}
        <div className="w-full flex justify-between border-t-2 border-white/10 pt-4 text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest">
           <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> OK</span>
           <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> STABLE</span>
           <span className="flex items-center gap-2"><Wifi className="w-3 h-3" /> SYNC</span>
        </div>
      </div>

      {/* Retro Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default WelcomeLoadingScreen;
