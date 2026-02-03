import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { gameStore } from '../../store/gameStore';

export default function Miku() {
  const state = useStore(gameStore);
  
  // Check if active
  const activeItems = JSON.parse(state.activeItems || '[]') as string[];
  const unlocked = JSON.parse(state.unlockedItems || '[]') as string[];
  const hasMiku = unlocked.includes('miku_companion');
  const hasDance = unlocked.includes('pet_miku_dance');

  if (!activeItems.includes('miku_companion') || !hasMiku || state.gameEnabled !== 'true') {
      return null;
  }

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mikuState, setMikuState] = useState<'idle' | 'run' | 'shock' | 'dance'>('idle');
  const [flip, setFlip] = useState(false);
  
  const idleTimer = useRef<number | null>(null);
  const lastActiveTime = useRef(Date.now());
  const isMovedRecently = useRef(false);

  // Constants
  const DELAY = 0.05; // 0.05 = Laggy follow, 1 = instant
  const SHOCK_THRESHOLD = 5000; // 5 seconds of idle triggers shock
  
  // Update mouse target
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      const timeSinceLastMove = now - lastActiveTime.current;

      // Logic: If idle too long -> Shock. If moving -> Run. If Dance Protocol owned -> Random chance to dance?
      // Actually, let's keep it simple for now to avoid complexity bugs
      if (timeSinceLastMove > SHOCK_THRESHOLD) {
          setMikuState('shock');
          // If dance protocol purchased, maybe she dances instead of shock sometimes?
          if (hasDance && Math.random() > 0.5) {
               setMikuState('dance');
          } else {
               // Default Shock behavior
               setTimeout(() => setMikuState('run'), 1000); 
          }
      } else if (mikuState !== 'shock' && mikuState !== 'dance') {
          setMikuState('run');
      }

      lastActiveTime.current = now;
      isMovedRecently.current = true;
      
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
  }, [position.x, mikuState, hasDance]);

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



  // Placeholder images - The user has been instructed to upload these
  const getImage = () => {
      switch(mikuState) {
          case 'shock': return '/images/miku-shock.png';
          case 'dance': return '/images/miku-run.gif'; // Fallback to run for dance
          case 'run': return '/images/miku-run.gif'; // Or png if gif not avail
          default: return '/images/miku-idle.gif';
      }
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
        {/* If image fails, show a cute fallback div */}
        <img 
            src={getImage()} 
            alt="Miku"
            className="w-full h-full object-contain"
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-pink-500/50 rounded-full blur-md animate-pulse"></div>';
            }}
        />
    </div>
  );
}
