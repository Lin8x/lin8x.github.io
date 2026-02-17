import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { gameStore } from '../../store/gameStore';

export default function GameEffects() {
    const $gameStore = useStore(gameStore);
    
    useEffect(() => {
        const active = JSON.parse($gameStore.activeItems || '[]') as string[];
        
        // Clear all theme classes first
        document.body.classList.remove('theme-matrix', 'theme-minecraft', 'theme-rainbow');
        
        // Apply themes with priority: Rainbow > Minecraft > Matrix
        if (active.includes('theme_rainbow')) {
            document.body.classList.add('theme-rainbow');
        } else if (active.includes('theme_minecraft')) {
            document.body.classList.add('theme-minecraft');
        } else if (active.includes('theme_matrix')) {
            document.body.classList.add('theme-matrix');
        }

        // Future effects (e.g. Cursor trails) can go here
        
    }, [$gameStore.activeItems]);

    return null;
}
