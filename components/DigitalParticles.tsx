
import React, { useMemo } from 'react';

const DigitalParticles: React.FC = () => {
  const particles = useMemo(() => {
    // Generate data cubes
    const cubes = Array.from({ length: 20 }).map((_, i) => ({
      type: 'cube',
      id: `cube-${i}`,
      left: `${Math.random() * 100}%`,
      size: `${Math.floor(Math.random() * 15) + 8}px`,
      duration: `${Math.random() * 15 + 15}s`,
      delay: `${Math.random() * 20}s`,
      color: Math.random() > 0.8 ? 'rgba(255, 127, 0, 0.1)' : 'rgba(0, 255, 255, 0.1)',
      borderColor: Math.random() > 0.8 ? 'rgba(255, 127, 0, 0.3)' : 'rgba(0, 255, 255, 0.3)'
    }));

    // Generate binary bits
    const bits = Array.from({ length: 30 }).map((_, i) => ({
      type: 'bit',
      id: `bit-${i}`,
      left: `${Math.random() * 100}%`,
      value: Math.random() > 0.5 ? '0' : '1',
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 15}s`
    }));

    return { cubes, bits };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#0f172a]">
      {/* Scanline Effect */}
      <div className="scanline" />
      
      {/* Data Cubes */}
      {particles.cubes.map((cube) => (
        <div
          key={cube.id}
          className="data-cube border"
          style={{
            left: cube.left,
            width: cube.size,
            height: cube.size,
            animationDuration: cube.duration,
            animationDelay: cube.delay,
            backgroundColor: cube.color,
            borderColor: cube.borderColor
          }}
        />
      ))}

      {/* Binary Bits */}
      {particles.bits.map((bit) => (
        <div
          key={bit.id}
          className="binary-bit"
          style={{
            left: bit.left,
            animationDuration: bit.duration,
            animationDelay: bit.delay,
          }}
        >
          {bit.value}
        </div>
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  );
};

export default DigitalParticles;
