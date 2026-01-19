
import React from 'react';
import { X, Info, ChevronRight, ChevronsLeftRight, Hash } from 'lucide-react';
import { SelectedDigimonForInfo } from '../types';

interface DigimonInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Updated type to use the simplified SelectedDigimonForInfo
  digimonInfo: (SelectedDigimonForInfo & { id: number }) | null; // Added 'id' here to maintain structure
}

const levelColors: Record<string, string> = {
  'Rookie': 'bg-[#32CD32]',
  'Champion': 'bg-[#007FFF]',
  'Ultimate': 'bg-[#FF7F00]',
  'Mega': 'bg-[#8A2BE2]',
  'Armor': 'bg-[#FFD700]',
  'Fresh': 'bg-[#A0AEC0]',
  'In-Training': 'bg-[#CBD5E0]',
  'Baby': 'bg-[#A0AEC0]',
  'Unknown': 'bg-[#4a5568]'
};

const getLevelColor = (level: string) => {
  const key = Object.keys(levelColors).find(k => level.includes(k)) || 'Unknown';
  return levelColors[key];
};

const DigimonInfoModal: React.FC<DigimonInfoModalProps> = ({ isOpen, onClose, digimonInfo }) => {
  if (!isOpen || !digimonInfo) return null;

  // Destructure directly from digimonInfo, no more apiData nested object
  const { name, level, evolutionNode, incomingRequirements, id } = digimonInfo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a202c]/70 p-4 animate-fade-in">
      <div className="bg-white border-8 border-[#1a202c] shadow-[12px_12px_0_#1a202c] w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b-8 border-[#1a202c] flex justify-between items-center bg-[#007FFF]">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-black font-digital text-white drop-shadow-[2px_2px_0_#1a202c] uppercase">
              {name}
            </h2>
            <div className={`px-3 py-1 text-xs font-black uppercase text-white tracking-wider border-2 border-[#1a202c] ${getLevelColor(level)} hidden sm:block`}>
              {level}
            </div>
            <div className="flex items-center gap-1 text-white text-xs font-bold hidden sm:flex">
              <Hash className="w-3 h-3 text-white" />
              ID: {id || 0} {/* Use id directly */}
            </div>
          </div>
          <button onClick={onClose} className="p-1 bg-white border-4 border-[#1a202c] hover:bg-red-400 transition-colors btn-flat">
            <X className="w-6 h-6 text-[#1a202c]" />
          </button>
        </div>
        
        {/* Body - Adjusted to single column after removing image */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 grid grid-cols-1 md:grid-cols-1 gap-8 bg-[#f8fafc]">
          {/* Evolution Details now take full width */}
          <div className="space-y-6">
            {/* Incoming Evolutions */}
            {incomingRequirements.length > 0 && (
              <div className="border-4 border-[#1a202c] p-4 bg-white shadow-[3px_3px_0_#FF7F00]">
                <h3 className="flex items-center gap-2 text-base font-black uppercase text-[#FF7F00] border-b-2 border-[#1a202c] pb-2 mb-3">
                  <ChevronsLeftRight className="w-4 h-4" />
                  Incoming Evolutions
                </h3>
                <ul className="space-y-2 text-sm font-semibold">
                  {incomingRequirements.map((req, idx) => (
                    <li key={idx} className="bg-[#e2e8f0] p-2 border-2 border-[#cbd5e0] text-[#1a202c]">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outgoing Evolutions */}
            <div className="border-4 border-[#1a202c] p-4 bg-white shadow-[3px_3px_0_#32CD32]">
              <h3 className="flex items-center gap-2 text-base font-black uppercase text-[#32CD32] border-b-2 border-[#1a202c] pb-2 mb-3">
                <ChevronRight className="w-4 h-4" />
                Outgoing Evolutions
              </h3>
              {evolutionNode.evolutions.length > 0 ? (
                <ul className="space-y-2 text-sm font-semibold">
                  {evolutionNode.evolutions.map((ev, idx) => (
                    <li key={idx} className="bg-[#e2e8f0] p-2 border-2 border-[#cbd5e0] text-[#1a202c]">
                      <span className="font-bold text-[#007FFF]">To: {ev.to}</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {ev.requirements.map((r, rIdx) => (
                          <li key={rIdx} className="text-xs text-gray-700">
                            {r.value} {r.isBidirectional && '(Bidirectional)'}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No further evolutions in this line.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-[#1a202c] text-[10px] text-white font-black uppercase tracking-widest text-center">
          <Info className="w-3 h-3 inline-block mr-2 align-middle text-[#FF7F00]" />
          Detailed Data Retrieval Complete
        </div>
      </div>
    </div>
  );
};

export default DigimonInfoModal;
