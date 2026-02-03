import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { gameStore } from '../../store/gameStore';

export default function GameEffects() {
    const $gameStore = useStore(gameStore);
    
    useEffect(() => {
        const active = JSON.parse($gameStore.activeItems || '[]') as string[];
        
        // Matrix Mode
        if (active.includes('theme_matrix')) {
            document.body.classList.add('theme-matrix');
        } else {
            document.body.classList.remove('theme-matrix');
        }

        // Future effects (e.g. Cursor trails) can go here
        
    }, [$gameStore.activeItems]);

    return null;
}
