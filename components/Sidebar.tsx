
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Search, Monitor, FileSpreadsheet, Layers, Target } from 'lucide-react';
import { EvolutionLine } from '../types';
import { downloadEvolutionDataAsCSV } from '../services/exporter';
import SearchSuggestions from './SearchSuggestions';

interface SidebarProps {
  lines: EvolutionLine[];
  selectedLine: EvolutionLine | null;
  onSelect: (line: EvolutionLine) => void;
  onShowNatures: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  predictions: { name: string, lineTitle: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ lines, selectedLine, onSelect, onShowNatures, search, onSearchChange, predictions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredLines = useMemo(() => {
    if (!search.trim()) return lines;
    
    const term = search.toLowerCase();
    return lines.filter(l => {
      const matchTitle = l.title.toLowerCase().includes(term);
      const matchRoot = l.root.toLowerCase().includes(term);
      const matchInternal = Object.keys(l.nodes).some(name => 
        name.toLowerCase().includes(term)
      );
      
      return matchTitle || matchRoot || matchInternal;
    });
  }, [lines, search]);

  const getMatchHighlight = (line: EvolutionLine) => {
    if (!search.trim()) return null;
    const term = search.toLowerCase();
    const internalMatch = Object.keys(line.nodes).find(name => 
      name.toLowerCase().includes(term) && 
      !line.title.toLowerCase().includes(term) && 
      !line.root.toLowerCase().includes(term)
    );
    return internalMatch;
  };

  const handleExport = () => {
    downloadEvolutionDataAsCSV(lines);
  };

  const handlePredictiveSelect = (lineTitle: string) => {
    const line = lines.find(l => l.title === lineTitle);
    if (line) {
      onSelect(line);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside className="w-full h-full flex flex-col bg-slate-900 border-r-4 border-slate-950 shadow-[4px_0_0_#0f172a] overflow-hidden">
      <div className="p-4 lg:p-6 space-y-4 bg-slate-800 border-b-4 border-slate-950">
        <div className="flex items-center gap-3">
          <div className="p-1.5 lg:p-2 bg-cyan-700 border-2 border-slate-950">
            <Monitor className="text-white w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <h1 className="text-xl lg:text-2xl font-black font-digital tracking-tighter text-white drop-shadow-[2px_2px_0_#0f172a]">
            DIGI-DEX
          </h1>
        </div>
        
        <div className="relative" ref={searchContainerRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input 
            type="text"
            value={search}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Search Sector..."
            className="w-full bg-slate-900 border-2 border-slate-950 py-2 pl-10 pr-4 text-sm font-bold text-white focus:outline-none placeholder:text-slate-500 focus:border-cyan-500 font-digital"
          />
          <SearchSuggestions 
            suggestions={predictions} 
            onSelect={handlePredictiveSelect} 
            isVisible={showSuggestions}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={onShowNatures}
            className="flex items-center justify-center gap-2 bg-cyan-700 text-white border-4 border-slate-950 py-2 px-1 text-[10px] font-black btn-flat hover:bg-cyan-600 uppercase tracking-widest"
          >
            <Layers className="w-3.5 h-3.5" />
            NATURES
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white border-4 border-slate-950 py-2 px-1 text-[10px] font-black btn-flat hover:bg-emerald-500 uppercase tracking-widest"
            title="Export Digital Reference Guide"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            EXPORT
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 lg:px-4 py-6 space-y-3 bg-[#0f172a]">
        <div className="text-[10px] lg:text-xs font-black text-cyan-400 uppercase tracking-widest px-2 flex items-center gap-2">
          <div className="h-2 w-2 bg-cyan-400 animate-pulse"></div>
          Sector Manifest
        </div>
        
        {filteredLines.length > 0 ? (
          filteredLines.map((line) => {
            const highlightedMatch = getMatchHighlight(line);
            const isSelected = selectedLine?.title === line.title;

            return (
              <button
                key={line.title}
                onClick={() => onSelect(line)}
                className={`
                  w-full text-left px-3 lg:px-4 py-3 border-2 transition-all duration-100 btn-flat relative font-digital
                  ${isSelected 
                    ? 'bg-cyan-700 border-cyan-400 text-white' 
                    : 'bg-slate-800 border-slate-950 text-slate-300 hover:bg-slate-700 hover:text-white'}
                `}
              >
                <div className="text-xs lg:text-sm font-black uppercase truncate tracking-wider">{line.title.replace(' LINE', '')}</div>
                
                <div className="flex items-center justify-between mt-1.5">
                  <div className={`text-[9px] lg:text-[10px] font-bold truncate ${isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>
                    Root: {line.root}
                  </div>
                  {highlightedMatch && (
                    <div className="flex items-center gap-1 bg-slate-950 px-1 py-0.5 border border-cyan-900">
                      <Target className="w-2.5 h-2.5 text-cyan-400" />
                      <span className="text-[8px] font-black text-white uppercase truncate max-w-[80px]">
                        {highlightedMatch}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <div className="p-4 text-center text-slate-500 font-bold text-xs uppercase italic tracking-widest">
            No Sectors Found
          </div>
        )}
      </div>
      
      <div className="p-4 bg-slate-950 border-t-2 border-slate-900 flex justify-between items-center shrink-0">
        <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Digital Terminal Online</div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-cyan-400"></div>
          <div className="w-2 h-2 bg-orange-500"></div>
          <div className="w-2 h-2 bg-slate-700"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
