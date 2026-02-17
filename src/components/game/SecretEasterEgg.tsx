import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { gameStore, findSecret, hasFoundSecret } from '../../store/gameStore';

interface SecretEasterEggProps {
  secretId: string;
  imageSrc: string;
  points?: number;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export default function SecretEasterEgg({ 
  secretId, 
  imageSrc, 
  points = 400,
  position = 'bottom-right'
}: SecretEasterEggProps) {
  const $gameStore = useStore(gameStore);
  const [isFound, setIsFound] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    setIsFound(hasFoundSecret(secretId));
  }, [$gameStore.secretsFound]);

  const handleClick = () => {
    if (isFound) return;
    
    const success = findSecret(secretId, points);
    if (success) {
      setShowSparkle(true);
      setIsFound(true);
      
      // Hide sparkle after animation
      setTimeout(() => setShowSparkle(false), 1000);
    }
  };

  const positionClasses = {
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
    'top-left': 'top-24 left-8',
    'top-right': 'top-24 right-8',
  };

  if ($gameStore.gameEnabled !== 'true') return null;

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-30 pointer-events-auto`}
    >
      <button
        onClick={handleClick}
        disabled={isFound}
        className={`
          relative w-20 h-20 md:w-24 md:h-24 
          transition-all duration-500 ease-out
          ${isFound 
            ? 'opacity-30 cursor-default grayscale' 
            : 'opacity-10 hover:opacity-40 cursor-pointer hover:scale-110'
          }
        `}
        title={isFound ? 'Already discovered!' : 'What\'s this...?'}
      >
        <img 
          src={imageSrc} 
          alt="Hidden secret" 
          className="w-full h-full object-contain"
        />
        
        {/* Sparkle effect on discovery */}
        {showSparkle && (
          <div className="absolute inset-0 flex items-center justify-center animate-ping">
            <div className="w-full h-full bg-yellow-400/30 rounded-full" />
          </div>
        )}
        
        {/* Discovered checkmark */}
        {isFound && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}
