
import React from 'react';
import { Target, Cpu, Activity, ChevronRight } from 'lucide-react';

interface Suggestion {
  name: string;
  lineTitle: string;
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  onSelect: (lineTitle: string) => void;
  isVisible: boolean;
  className?: string;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSelect, isVisible, className = "" }) => {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div className={`absolute left-0 right-0 mt-1 bg-slate-900 border-2 border-cyan-500 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-[100] overflow-hidden animate-fade-in ${className}`}>
      {/* Tactical Header for the Dropdown */}
      <div className="bg-slate-950 px-3 py-2 border-b border-cyan-900 flex items-center justify-between">
        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Cpu className="w-3 h-3 animate-pulse" />
          Neural_Match_Found
        </span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-cyan-500"></div>
          <div className="w-1 h-1 bg-cyan-500/50"></div>
          <div className="w-1 h-1 bg-cyan-500/20"></div>
        </div>
      </div>

      <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto custom-scrollbar">
        {suggestions.map((s, idx) => (
          <button
            key={`${s.name}-${idx}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(s.lineTitle);
            }}
            className="w-full flex items-center justify-between p-4 active:bg-cyan-500/20 hover:bg-cyan-500/10 border-b border-slate-800 last:border-0 group transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-slate-800 border-2 border-slate-700 group-active:border-cyan-400 transition-colors">
                <Target className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-black text-white group-active:text-cyan-400 uppercase tracking-widest">
                  {s.name}
                </div>
                <div className="text-[9px] font-bold text-slate-500 group-active:text-cyan-100 uppercase mt-0.5">
                  Sector: {s.lineTitle.replace(' LINE', '')}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700 group-active:text-cyan-400" />
          </button>
        ))}
      </div>

      <div className="p-2 bg-slate-950 flex items-center justify-center gap-4">
        <div className="h-[1px] flex-1 bg-slate-800"></div>
        <div className="text-[8px] text-slate-600 font-black uppercase tracking-[0.3em]">
          End_Of_Data
        </div>
        <div className="h-[1px] flex-1 bg-slate-800"></div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
