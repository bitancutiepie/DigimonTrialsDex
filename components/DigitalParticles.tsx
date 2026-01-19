
import React, { useMemo } from 'react';

const DigitalParticles: React.FC = () => {
  const particles = useMemo(() => {
    // Generate data cubes - more variety and density
    const cubes = Array.from({ length: 25 }).map((_, i) => ({
      type: 'cube',
      id: `cube-${i}`,
      left: `${Math.random() * 100}%`,
      size: `${Math.floor(Math.random() * 20) + 12}px`,
      duration: `${Math.random() * 10 + 10}s`, // Slightly faster
      delay: `${Math.random() * -20}s`, // Negative delay to start mid-animation
      color: Math.random() > 0.8 ? 'rgba(249, 115, 22, 0.15)' : 'rgba(34, 211, 238, 0.15)',
      borderColor: Math.random() > 0.8 ? 'rgba(249, 115, 22, 0.4)' : 'rgba(34, 211, 238, 0.4)',
      opacity: Math.random() * 0.5 + 0.2
    }));

    // Generate binary bits - more prominent
    const bits = Array.from({ length: 40 }).map((_, i) => ({
      type: 'bit',
      id: `bit-${i}`,
      left: `${Math.random() * 100}%`,
      value: Math.random() > 0.5 ? '0' : '1',
      duration: `${Math.random() * 8 + 8}s`,
      delay: `${Math.random() * -15}s`,
      opacity: Math.random() * 0.4 + 0.1
    }));

    // Data streams (falling fast lines)
    const streams = Array.from({ length: 10 }).map((_, i) => ({
      id: `stream-${i}`,
      left: `${Math.random() * 100}%`,
      width: '1px',
      height: `${Math.random() * 100 + 50}px`,
      duration: `${Math.random() * 2 + 1}s`,
      delay: `${Math.random() * -5}s`,
      opacity: Math.random() * 0.2 + 0.05
    }));

    return { cubes, bits, streams };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
            opacity: bit.opacity
          }}
        >
          {bit.value}
        </div>
      ))}

      {/* Data Streams */}
      {particles.streams.map((stream) => (
        <div
          key={stream.id}
          className="data-stream"
          style={{
            left: stream.left,
            width: stream.width,
            height: stream.height,
            animationDuration: stream.duration,
            animationDelay: stream.delay,
            opacity: stream.opacity
          }}
        />
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
