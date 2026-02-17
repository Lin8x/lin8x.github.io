import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { gameStore } from '../../store/gameStore';

// Frame definitions for each animation state
const MIKU_FRAMES = {
  idle: [
    '/images/secrets/miku/miku-idle-1.png',
    '/images/secrets/miku/miku-idle-2.png',
  ],
  run: [
    '/images/secrets/miku/miku-run-1.png',
    '/images/secrets/miku/miku-run-2.png',
  ],
  dance: [
    '/images/secrets/miku/miku-dance-1.png',
    '/images/secrets/miku/miku-dance-2.png',
    '/images/secrets/miku/miku-dance-3.png',
  ],
};

const FRAME_DURATIONS = {
  idle: 500,   // Slow breathing animation
  run: 150,    // Fast running
  dance: 200,  // Medium dance pace
};

export default function Miku() {
  const state = useStore(gameStore);
  
  // Check if active
  const activeItems = JSON.parse(state.activeItems || '[]') as string[];
  const unlocked = JSON.parse(state.unlockedItems || '[]') as string[];
  const hasMiku = unlocked.includes('miku_companion');
  const hasDance = unlocked.includes('pet_miku_dance');
  const isDanceActive = activeItems.includes('pet_miku_dance') && hasDance;

  if (!activeItems.includes('miku_companion') || !hasMiku || state.gameEnabled !== 'true') {
      return null;
  }

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mikuState, setMikuState] = useState<'idle' | 'run' | 'dance'>('idle');
  const [flip, setFlip] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  
  const idleTimer = useRef<number | null>(null);

  // Constants
  const DELAY = 0.05; // 0.05 = Laggy follow, 1 = instant
  
  // Update mouse target
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Set to running when mouse moves
      if (mikuState !== 'dance') {
          setMikuState('run');
      }
      
      // Face direction
      if (e.clientX < position.x) setFlip(true);
      if (e.clientX > position.x) setFlip(false);

      // Reset idle timer
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
          setMikuState('idle');
      }, 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position.x, mikuState]);

  // Animation Loop (Lerp)
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
        setPosition(prev => {
            const dx = mousePos.x - prev.x;
            const dy = mousePos.y - prev.y;
            
            // Stop jitter when close
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return prev; 

            return {
                x: prev.x + dx * DELAY,
                y: prev.y + dy * DELAY
            };
        });
        animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Frame animation loop
  useEffect(() => {
    // When dance mode is active, replace idle with dance animation
    const effectiveState = (isDanceActive && mikuState === 'idle') ? 'dance' : mikuState;
    const frames = MIKU_FRAMES[effectiveState];
    const duration = FRAME_DURATIONS[effectiveState];
    
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % frames.length);
    }, duration);
    
    // Reset frame index when state changes
    setFrameIndex(0);
    
    return () => clearInterval(interval);
  }, [mikuState, isDanceActive]);

  // Get current frame image
  const getCurrentFrame = () => {
    // When dance mode is active, replace idle with dance animation
    const effectiveState = (isDanceActive && mikuState === 'idle') ? 'dance' : mikuState;
    const frames = MIKU_FRAMES[effectiveState];
    return frames[frameIndex % frames.length];
  };

  return (
    <div 
        className="fixed pointer-events-none z-40 w-16 h-16 transition-transform will-change-transform"
        style={{ 
            left: -32, // Offset to center
            top: -32, // Offset to center
            transform: `translate(${position.x}px, ${position.y}px) scaleX(${flip ? -1 : 1})` 
        }}
    >
        {/* Animated Miku sprite */}
        <img 
            src={getCurrentFrame()} 
            alt="Miku"
            className="w-full h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-pink-500/50 rounded-full blur-md animate-pulse"></div>';
            }}
        />
    </div>
  );
}
