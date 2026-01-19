
import React from 'react';
import { Hash, Zap } from 'lucide-react';

interface DigimonCardProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  incomingRequirements?: string[];
  imageUrl: string; 
  level: string; 
  onClick?: (name: string, level: string, imageUrl: string) => void;
}

const DigimonCard: React.FC<DigimonCardProps> = ({ name, className = '', size = 'md', incomingRequirements = [], level, onClick }) => {
  const displayLevel = level || 'Unknown';

  const sizeClasses = {
    sm: 'w-32 h-24', 
    md: 'w-44 h-32 sm:w-48 sm:h-36 lg:w-60 lg:h-40',
    lg: 'w-60 h-40 sm:w-64 sm:h-44 lg:w-80 lg:h-52'
  };

  const levelColors: Record<string, { border: string, bg: string, glow: string }> = {
    'Rookie': { border: 'border-emerald-500', bg: 'bg-emerald-500', glow: 'shadow-[0_0_10px_#10b981]' },
    'Champion': { border: 'border-cyan-500', bg: 'bg-cyan-500', glow: 'shadow-[0_0_10px_#06b6d4]' },
    'Ultimate': { border: 'border-orange-500', bg: 'bg-orange-500', glow: 'shadow-[0_0_10px_#f97316]' },
    'Mega': { border: 'border-purple-500', bg: 'bg-purple-500', glow: 'shadow-[0_0_10px_#a855f7]' },
    'Armor': { border: 'border-yellow-400', bg: 'bg-yellow-400', glow: 'shadow-[0_0_10px_#facc15]' },
    'Unknown': { border: 'border-slate-500', bg: 'bg-slate-500', glow: 'shadow-[0_0_10px_#64748b]' }
  };

  const getLevelStyles = (lvl: string) => {
    const key = Object.keys(levelColors).find(k => lvl.includes(k)) || 'Unknown';
    return levelColors[key];
  };

  const styles = getLevelStyles(displayLevel);

  return (
    <div 
      className={`
        relative flex flex-col bg-slate-900 border-2 border-slate-800
        transition-all duration-300 group overflow-visible
        ${onClick ? 'cursor-pointer hover:border-cyan-400/50 hover:scale-[1.02]' : ''}
        ${sizeClasses[size]} ${className}
      `}
      onClick={() => onClick?.(name, displayLevel, '')}
    >
      {/* Outer Tactical Brackets */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-slate-700 group-hover:border-cyan-400 transition-colors"></div>
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-slate-700 group-hover:border-cyan-400 transition-colors"></div>

      {/* Glowing Level Header */}
      <div className={`h-1.5 w-full ${styles.bg} ${styles.glow} z-20`}></div>

      {/* Main Visual Display */}
      <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center p-3">
        {/* Technical Hex Grid Background */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 1L2 6v12l10 5 10-5V6L12 1z' fill='none' stroke='%2300ffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '16px 16px'
        }}></div>

        {/* Diagonal Light Sweep Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          <p className="text-xs lg:text-base font-black font-digital text-white tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-center">
            {name}
          </p>
          <div className="flex items-center gap-1 opacity-40">
            <Hash className="w-2 h-2 text-cyan-400" />
            <span className="text-[7px] font-bold text-cyan-400 tracking-tighter">DATA_NODE</span>
          </div>
        </div>

        {/* Stage Badge */}
        <div className={`absolute top-0 right-0 px-2 py-0.5 ${styles.bg} text-[7px] lg:text-[9px] font-black text-slate-900 uppercase tracking-tighter skew-x-[-20deg] origin-top-right mr-[-2px]`}>
          <div className="skew-x-[20deg]">{displayLevel}</div>
        </div>
      </div>
      
      {/* Requirements Footer */}
      {incomingRequirements.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50 p-1.5 min-h-[1.8rem] flex items-center justify-center">
          <div className="flex flex-wrap gap-1 justify-center">
            {incomingRequirements.slice(0, 3).map((req, idx) => (
              <span key={idx} className="bg-slate-950 border border-slate-700 text-cyan-400 text-[6px] lg:text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-tighter leading-none flex items-center gap-1">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                {req}
              </span>
            ))}
            {incomingRequirements.length > 3 && (
              <span className="text-white text-[7px] font-bold">+</span>
            )}
          </div>
        </div>
      )}

      {/* Decorative ID tag */}
      <div className="absolute -bottom-1 left-2 px-1 bg-slate-900 border border-slate-700 text-[6px] text-slate-500 font-bold uppercase z-20">
        SEC_{name.slice(0,3).toUpperCase()}
      </div>
    </div>
  );
};

export default DigimonCard;
