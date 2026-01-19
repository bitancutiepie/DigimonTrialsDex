
import React, { useMemo, useCallback, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { EvolutionLine, DigimonNode } from '../types';
import DigimonCard from './DigimonCard';
import { Zap, Activity } from 'lucide-react';

interface EvolutionTreeProps {
  line: EvolutionLine;
  onDigimonClick: (name: string, level: string, imageUrl: string, digimonNode: DigimonNode, incomingRequirements: string[]) => void;
}

interface Point { x: number; y: number; }
interface Connection {
  from: string;
  to: string;
  isBidirectional: boolean;
  requirements: string[];
}

const EvolutionTree: React.FC<EvolutionTreeProps> = ({ line, onDigimonClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [coords, setCoords] = useState<Record<string, Point>>({});
  const [, setTick] = useState(0); // For forcing re-renders

  const PLACEHOLDER_IMAGE_URL = 'https://digimon.shadowsmith.com/img/placeholder.png';
  const PLACEHOLDER_LEVEL = 'Unknown';

  // 1. Requirement mapping for the cards
  const requirementMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.values(line.nodes).forEach(node => {
      node.evolutions.forEach(ev => {
        if (!map[ev.to]) map[ev.to] = [];
        ev.requirements.forEach(r => {
          if (!map[ev.to].includes(r.value)) map[ev.to].push(r.value);
        });
      });
    });
    return map;
  }, [line]);

  // 2. Layering Logic
  const layers = useMemo(() => {
    const depthMap: Record<string, number> = {};
    const processed = new Set<string>();

    const assignDepth = (name: string, depth: number) => {
      depthMap[name] = Math.max(depthMap[name] || 0, depth);
      const node = line.nodes[name];
      if (node && !processed.has(name)) {
        processed.add(name);
        node.evolutions.forEach(ev => {
          if (!ev.isBidirectional) assignDepth(ev.to, depth + 1);
        });
      }
    };

    assignDepth(line.root, 0);
    
    // Handle orphaned nodes (Jogress targets or disconnected branches)
    Object.keys(line.nodes).forEach(name => {
      if (depthMap[name] === undefined) depthMap[name] = 0;
    });

    const maxDepth = Math.max(...Object.values(depthMap), 0);
    const layersArr: string[][] = Array.from({ length: maxDepth + 1 }, () => []);
    Object.entries(depthMap).forEach(([name, depth]) => layersArr[depth].push(name));
    
    return layersArr.filter(l => l.length > 0);
  }, [line]);

  // 3. Connection list for SVG rendering
  const connections = useMemo(() => {
    const list: Connection[] = [];
    Object.values(line.nodes).forEach(node => {
      node.evolutions.forEach(ev => {
        list.push({
          from: node.name,
          to: ev.to,
          isBidirectional: !!ev.isBidirectional,
          requirements: ev.requirements.map(r => r.value)
        });
      });
    });
    return list;
  }, [line]);

  // 4. Position tracking logic
  const updateCoords = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCoords: Record<string, Point> = {};
    
    Object.entries(cardRefs.current).forEach(([name, el]) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        newCoords[name] = {
          x: rect.left - containerRect.left + rect.width / 2 + containerRef.current!.scrollLeft,
          y: rect.top - containerRect.top + rect.height / 2 + containerRef.current!.scrollTop
        };
      }
    });
    setCoords(newCoords);
  }, []);

  useLayoutEffect(() => {
    updateCoords();
    const timer = setTimeout(updateCoords, 100); // Small delay to ensure layout stability
    return () => clearTimeout(timer);
  }, [line, updateCoords]);

  useEffect(() => {
    const observer = new ResizeObserver(updateCoords);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateCoords);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCoords);
    };
  }, [updateCoords]);

  const handleCardClick = useCallback((name: string) => {
    const node = line.nodes[name];
    if (node) onDigimonClick(name, PLACEHOLDER_LEVEL, PLACEHOLDER_IMAGE_URL, node, requirementMap[name] || []);
  }, [line.nodes, requirementMap, onDigimonClick]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-auto bg-[#0f172a] custom-scrollbar p-12 sm:p-24 lg:p-40 flex flex-col items-center"
    >
      {/* Neural Link Connection Layer */}
      <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible" style={{ minWidth: '100%', minHeight: '100%' }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-orange-500/50" />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((conn, idx) => {
          const start = coords[conn.from];
          const end = coords[conn.to];
          if (!start || !end) return null;

          // Check if connection is vertical or skip-layer
          const isDownward = end.y > start.y;
          const cp1y = start.y + (isDownward ? 80 : -80);
          const cp2y = end.y - (isDownward ? 80 : -80);
          
          const pathD = `M ${start.x} ${start.y} C ${start.x} ${cp1y}, ${end.x} ${cp2y}, ${end.x} ${end.y}`;
          const strokeColor = conn.isBidirectional ? 'rgb(168, 85, 247)' : 'rgb(249, 115, 22)';

          return (
            <g key={`${conn.from}-${conn.to}-${idx}`} className="group/link transition-opacity duration-300">
              <path 
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth="3"
                strokeDasharray="8,8"
                className="opacity-20 group-hover/link:opacity-80 transition-opacity animate-[dash_20s_linear_infinite]"
                filter="url(#glow)"
              />
              <path 
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2"
                className="opacity-40 group-hover/link:opacity-100 transition-opacity"
              />
              {/* Midpoint Label Container */}
              <foreignObject 
                x={(start.x + end.x) / 2 - 60} 
                y={(start.y + end.y) / 2 - 12} 
                width="120" 
                height="24"
                className="overflow-visible"
              >
                <div className="flex justify-center pointer-events-auto">
                  <div className="bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded shadow-lg backdrop-blur-sm group-hover/link:border-cyan-500 transition-colors">
                    <span className="text-[7px] lg:text-[9px] font-black text-white/70 tracking-tighter uppercase whitespace-nowrap">
                      {conn.requirements[0] || 'DATA_LINK'}
                    </span>
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Grid Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'radial-gradient(#0891b2 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Data Node Layers */}
      <div className="relative z-10 flex flex-col items-center gap-48 lg:gap-72">
        {/* Header Decorator */}
        <div className="flex flex-col items-center gap-4 opacity-50 mb-10">
          <div className="flex gap-2">
            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            <Activity className="w-5 h-5 text-orange-400" />
          </div>
          <div className="h-10 w-px bg-gradient-to-b from-cyan-400 to-transparent"></div>
        </div>

        {layers.map((layer, layerIdx) => (
          <div 
            key={layerIdx} 
            className="flex flex-nowrap justify-center gap-12 sm:gap-20 lg:gap-32 min-w-max"
          >
            {layer.map(name => (
              <div 
                key={name} 
                // Fix: ensure ref callback does not implicitly return value
                ref={el => { cardRefs.current[name] = el; }}
                className="relative"
              >
                <DigimonCard 
                  name={name} 
                  size="md" 
                  incomingRequirements={requirementMap[name] || []}
                  imageUrl={PLACEHOLDER_IMAGE_URL} 
                  level={PLACEHOLDER_LEVEL}     
                  onClick={() => handleCardClick(name)}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Footer Decorator */}
        <div className="h-20 w-px bg-gradient-to-t from-slate-700 to-transparent opacity-30 mt-10"></div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
};

export default EvolutionTree;
