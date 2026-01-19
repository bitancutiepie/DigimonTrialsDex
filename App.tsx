
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { RAW_DATA } from './constants';
import { parseEvolutionLines } from './services/parser';
import { EvolutionLine, DigimonNode, SelectedDigimonForInfo } from './types';
import Sidebar from './components/Sidebar';
import EvolutionTree from './components/EvolutionTree';
import NatureModal from './components/NatureModal';
import DigimonInfoModal from './components/DigimonInfoModal';
import WelcomeLoadingScreen from './components/WelcomeLoadingScreen';
import DigitalParticles from './components/DigitalParticles';
import SearchSuggestions from './components/SearchSuggestions';
import { Shield, Zap, Info, Monitor, Menu, X, Wifi, Terminal, Search, Delete } from 'lucide-react';

const App: React.FC = () => {
  const evolutionLines = useMemo(() => parseEvolutionLines(RAW_DATA), []);
  const [selectedLine, setSelectedLine] = useState<EvolutionLine | null>(evolutionLines[0] || null);
  const [isNatureModalOpen, setIsNatureModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDigimonForInfo, setSelectedDigimonForInfo] = useState<SelectedDigimonForInfo | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const PLACEHOLDER_IMAGE_URL = 'https://digimon.shadowsmith.com/img/placeholder.png';
  const PLACEHOLDER_LEVEL = 'Unknown';

  // Compute all unique Digimon names and their lines for predictive search
  const allNodes = useMemo(() => {
    const nodes: { name: string, lineTitle: string }[] = [];
    evolutionLines.forEach(line => {
      Object.keys(line.nodes).forEach(nodeName => {
        nodes.push({ name: nodeName, lineTitle: line.title });
      });
    });
    return nodes;
  }, [evolutionLines]);

  const predictions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const term = searchQuery.toLowerCase();
    return allNodes
      .filter(n => n.name.toLowerCase().includes(term))
      .slice(0, 10);
  }, [allNodes, searchQuery]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
    if (showMobileSuggestions) setShowMobileSuggestions(false);
  };

  const handleSelectLine = (line: EvolutionLine) => {
    setSelectedLine(line);
    setIsSidebarOpen(false);
    setSelectedDigimonForInfo(null);
    setSearchQuery('');
    setShowMobileSuggestions(false);
    // Blur active element to close mobile keyboard
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handlePredictiveSelect = (lineTitle: string) => {
    const line = evolutionLines.find(l => l.title === lineTitle);
    if (line) handleSelectLine(line);
  };

  const handleDigimonInfoClick = useCallback((name: string, level: string, imageUrl: string, digimonNode: DigimonNode, incomingRequirements: string[]) => {
    setSelectedDigimonForInfo({
      name: name,
      level: level,
      imageUrl: imageUrl,
      evolutionNode: digimonNode,
      incomingRequirements: incomingRequirements
    });
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden selection:bg-cyan-500 selection:text-white relative font-digital">

      {!isBooted && (
        <WelcomeLoadingScreen onEnter={() => setIsBooted(true)} />
      )}

      <DigitalParticles />

      {/* Global Header: Fixed and z-50 to stay above everything else */}
      <header className="fixed top-0 left-0 right-0 h-16 lg:h-20 bg-cyan-700 border-b-4 border-slate-900 z-50 shadow-[0_4px_0_#0f172a] flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>

        <div className="h-16 lg:h-full flex items-center justify-between px-4 lg:px-10 relative z-10 gap-3">
          <div className={`flex items-center gap-3 lg:gap-6 transition-opacity duration-200 ${showMobileSuggestions ? 'opacity-0 w-0 overflow-hidden sm:opacity-100 sm:w-auto' : 'opacity-100'}`}>
            <button
              onClick={toggleSidebar}
              className={`lg:hidden p-2 border-2 border-slate-900 btn-flat flex items-center justify-center shrink-0 transition-all duration-200 ${isSidebarOpen ? 'bg-orange-500 text-white' : 'bg-white text-cyan-700'}`}
              aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="bg-slate-900 border-2 border-cyan-400 p-1.5 lg:p-2 rotate-3 hidden sm:block">
              <Terminal className="w-4 h-4 lg:w-6 lg:h-6 text-cyan-400 animate-pulse" />
            </div>

            <div className="max-w-[120px] sm:max-w-none">
              <h2 className="text-xs lg:text-2xl font-black font-digital tracking-wider text-white drop-shadow-[2px_2px_0_#0f172a] truncate uppercase">
                {selectedLine?.title.replace(' LINE', '') || 'SECTOR READY'}
              </h2>
            </div>
          </div>

          <div className={`relative flex-1 flex justify-end transition-all duration-300 ${showMobileSuggestions ? 'flex-[2]' : 'flex-1'}`} ref={mobileSearchRef}>
            <div className="relative w-full max-w-md">
              <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${showMobileSuggestions ? 'text-cyan-400' : 'text-cyan-100/50'}`} />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowMobileSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowMobileSuggestions(true);
                }}
                placeholder="SCAN..."
                className={`
                  w-full bg-slate-900/60 border-2 py-2 pl-9 pr-10 text-xs font-black text-white focus:outline-none transition-all uppercase tracking-widest
                  ${showMobileSuggestions ? 'border-cyan-400 bg-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-slate-900/50'}
                `}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:text-cyan-400 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <SearchSuggestions
                suggestions={predictions}
                onSelect={handlePredictiveSelect}
                isVisible={showMobileSuggestions}
                className="mt-2"
              />
            </div>
          </div>

          <div className={`flex items-center gap-2 lg:gap-4 transition-opacity duration-200 ${showMobileSuggestions ? 'hidden sm:flex' : 'flex'}`}>
            <button
              onClick={() => setIsNatureModalOpen(true)}
              className="lg:hidden p-2 bg-orange-500 border-2 border-slate-900 btn-flat flex items-center justify-center shrink-0"
            >
              <Info className="w-5 h-5 text-slate-900" />
            </button>

            <div className="hidden lg:flex bg-orange-600 border-4 border-slate-900 px-4 py-2 items-center gap-3 shadow-[3px_3px_0_#0f172a]">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <span className="text-white font-black text-xs uppercase tracking-widest">Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay and Container */}
      <div className={`
        fixed inset-0 z-40 transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        pt-16 lg:pt-0
      `}>
        {isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/60 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <div className="relative w-80 h-full">
          <Sidebar
            lines={evolutionLines}
            selectedLine={selectedLine}
            onSelect={handleSelectLine}
            onShowNatures={() => setIsNatureModalOpen(true)}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            predictions={predictions}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0f172a] w-full pt-16 lg:pt-20">

        {showMobileSuggestions && (
          <div className="lg:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-40 pointer-events-none"></div>
        )}

        <div className="flex-1 overflow-hidden relative z-10">
          {selectedLine ? (
            <EvolutionTree line={selectedLine} onDigimonClick={handleDigimonInfoClick} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4 px-4">
              <div className="p-6 lg:p-8 border-4 lg:border-8 border-slate-900 bg-orange-600 shadow-[8px_8px_0_#0f172a] animate-breathe">
                <Monitor className="w-16 h-16 lg:w-24 lg:h-24 text-white" />
              </div>
              <p className="font-digital text-sm lg:text-xl font-black uppercase text-cyan-400 animate-pulse text-center tracking-widest">
                Scanning Sector...
              </p>
            </div>
          )}
        </div>

        <div className="h-6 lg:h-8 bg-slate-900 border-t-4 border-slate-800 flex items-center px-4 lg:px-6 justify-between shrink-0 relative z-10">
          <div className="text-[8px] lg:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            SYSTEM ONLINE // STATUS: NORMAL
          </div>
          <div className="text-[8px] lg:text-[10px] text-cyan-400 font-black uppercase flex items-center gap-2">
            <Wifi className="w-3 h-3" />
            SECURE
          </div>
        </div>
      </main>

      <NatureModal
        isOpen={isNatureModalOpen}
        onClose={() => setIsNatureModalOpen(false)}
      />

      <DigimonInfoModal
        isOpen={!!selectedDigimonForInfo}
        onClose={() => setSelectedDigimonForInfo(null)}
        digimonInfo={selectedDigimonForInfo ? { ...selectedDigimonForInfo, id: 0 } : null}
      />
    </div>
  );
};

export default App;
