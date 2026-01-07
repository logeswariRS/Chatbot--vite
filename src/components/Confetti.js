import React, { useEffect, useState } from 'react';

const Confetti = ({ trigger }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: Math.random() * 10 + 5,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2
      }));
      setParticles(newParticles);

      const interval = setInterval(() => {
        setParticles(prev => 
          prev.map(p => ({
            ...p,
            y: p.y + p.speedY,
            x: p.x + p.speedX,
            rotation: p.rotation + 5
          })).filter(p => p.y < 110)
        );
      }, 16);

      setTimeout(() => {
        clearInterval(interval);
        setParticles([]);
      }, 3000);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            transition: 'all 0.1s linear'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;




