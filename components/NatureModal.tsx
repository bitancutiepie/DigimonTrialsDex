
import React from 'react';
import { X, Cpu, Activity, Zap, ShieldCheck } from 'lucide-react';
import { NATURE_GUIDE } from '../constants';

interface NatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NatureModal: React.FC<NatureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-slate-900 border-2 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-4xl max-h-[95vh] sm:max-h-[85vh] overflow-hidden flex flex-col group/modal">
        
        {/* Tactical Outer Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-500/50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-500/50 pointer-events-none"></div>

        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%2300ffff'/%3E%3C/svg%3E")`,
            backgroundSize: '10px 10px'
          }}></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/50">
              <Cpu className="text-cyan-400 w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-digital text-white tracking-widest uppercase">
                Personality Matrix
              </h2>
              <p className="text-[10px] font-bold text-cyan-400/70 tracking-tighter uppercase">Nature_Core_Protocol_Initialized</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="group/close relative p-2 bg-slate-800 border border-slate-600 hover:border-red-500 hover:bg-red-500/10 transition-all"
          >
            <X className="w-6 h-6 text-slate-400 group-hover/close:text-red-500 transition-colors" />
          </button>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900 relative">
          {/* Hex Grid Subtle Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 1L2 6v12l10 5 10-5V6L12 1z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '32px 32px'
          }}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 relative z-10">
            {NATURE_GUIDE.map((cat) => {
              const isLowkey = cat.name === 'Lowkey';
              const accentColor = isLowkey ? 'cyan-400' : 'orange-400';
              const shadowColor = isLowkey ? 'rgba(34,211,238,0.2)' : 'rgba(251,146,60,0.2)';

              return (
                <div key={cat.name} className="flex flex-col gap-4">
                  {/* Category Header Card */}
                  <div className={`
                    p-4 bg-slate-950 border-l-4 border-${accentColor} relative overflow-hidden
                    shadow-[4px_4px_0_rgba(0,0,0,0.3)]
                  `} style={{ boxShadow: `4px 4px 0px ${shadowColor}` }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-black font-digital text-${accentColor} tracking-widest uppercase`}>
                        {cat.name} Branch
                      </h3>
                      {isLowkey ? <Activity className="w-5 h-5 text-cyan-400 opacity-50" /> : <Zap className="w-5 h-5 text-orange-400 opacity-50" />}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                      {isLowkey ? 'Analytical / Defensive Evolutionary Data' : 'Aggressive / High-Performance Neural Coding'}
                    </p>
                  </div>

                  {/* Traits Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cat.traits.map(trait => (
                      <div 
                        key={trait} 
                        className="group/trait relative p-2 bg-slate-800/50 border border-slate-700 hover:border-slate-500 transition-all overflow-hidden"
                      >
                        <div className={`absolute top-0 left-0 w-1 h-0 group-hover/trait:h-full bg-${accentColor} transition-all duration-300`}></div>
                        <div className="flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full bg-${accentColor} animate-pulse`}></div>
                          <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-tight truncate">
                            {trait}
                          </span>
                        </div>
                        {/* Decorative hex detail */}
                        <div className="absolute -right-2 -bottom-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                           <ShieldCheck className={`w-8 h-8 text-${accentColor}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 p-6 bg-slate-950/50 border border-slate-800 border-dashed relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <Activity className="w-12 h-12 text-cyan-400" />
             </div>
             <p className="text-[11px] sm:text-xs text-slate-400 font-medium leading-relaxed max-w-2xl relative z-10 uppercase tracking-tight">
              <span className="text-cyan-400 font-black mr-2">[SYSTEM_NOTICE]</span> 
              Digimon natures dictate the neural pathway for digivolution. Ensure your current subject's personality parameters align with the target sector requirements to avoid mutation failure.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center px-6 shrink-0">
          <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">
            Nature_Link: Connected // Binary_Sync: 100%
          </div>
          <div className="flex gap-2">
             <div className="w-2 h-2 bg-cyan-500 animate-pulse"></div>
             <div className="w-2 h-2 bg-orange-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NatureModal;
