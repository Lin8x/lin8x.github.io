// src/store/gameStore.ts
import { persistentMap } from '@nanostores/persistent';
import { atom } from 'nanostores';

export type GameState = {
  points: string; 
  secretsFound: string; 
  unlockedItems: string;
  activeItems: string; // New: Store currently enabled items
  theme: string;
  gameEnabled: string; 
};

export const gameStore = persistentMap<GameState>('jalali_v1_', {
  points: '0',
  secretsFound: '[]',
  unlockedItems: '[]', 
  activeItems: '[]',
  theme: 'default',
  gameEnabled: 'true',
});

// Helper types
export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'unlock';
};

export const notifications = atom<Notification[]>([]);

export const addPoints = (amount: number, reason: string) => {
  const current = parseInt(gameStore.get().points);
  const newVal = current + amount;
  gameStore.setKey('points', newVal.toString());

  // Trigger notification
  const id = Math.random().toString(36).substr(2, 9);
  const newNotif: Notification = {
    id,
    title: `+${amount} XP`,
    message: reason || 'Points acquired',
    type: 'success'
  };
  
  notifications.set([...notifications.get(), newNotif]);

  // Auto-dismiss
  setTimeout(() => {
    notifications.set(notifications.get().filter(n => n.id !== id));
  }, 3000);
};

export const resetGame = () => {
    gameStore.set({
        points: '0',
        secretsFound: '[]',
        unlockedItems: '[]',
        activeItems: '[]',
        theme: 'default',
        gameEnabled: 'true'
    });
    window.location.reload();
};

export const toggleItem = (itemId: string) => {
    const currentActive = JSON.parse(gameStore.get().activeItems || '[]') as string[];
    let newActive;
    
    if (currentActive.includes(itemId)) {
        newActive = currentActive.filter(id => id !== itemId);
    } else {
        newActive = [...currentActive, itemId];
    }
    
    gameStore.setKey('activeItems', JSON.stringify(newActive));
};


// Shop Logic
export type ShopItem = {
    id: string;
    name: string;
    cost: number;
    description: string;
};

export const SHOP_ITEMS: ShopItem[] = [
    { id: 'miku_companion', name: 'Miku Companion', cost: 100, description: 'A digital assistant that follows your cursor.' },
    { id: 'theme_matrix', name: 'Matrix Mode', cost: 1000, description: 'Visual Override: Green rain aesthetic.' },
    { id: 'resume_full', name: 'Full Resume Access', cost: 50, description: 'Unlock the detailed PDF version of my CV.' },
    { id: 'pet_miku_dance', name: 'Miku Dance Protocol', cost: 2000, description: 'Enable "Party Mode" for the companion.' },
];

export const buyItem = (itemId: string) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const currentPoints = parseInt(gameStore.get().points);
    const unlocked = JSON.parse(gameStore.get().unlockedItems) as string[];

    if (unlocked.includes(itemId)) return; // Already owned

    if (currentPoints >= item.cost) {
        // Deduct
        gameStore.setKey('points', (currentPoints - item.cost).toString());
        
        // Unlock
        const newUnlocked = [...unlocked, itemId];
        gameStore.setKey('unlockedItems', JSON.stringify(newUnlocked));

        // Auto-enable newly bought item
        const active = JSON.parse(gameStore.get().activeItems || '[]') as string[];
        if (!active.includes(itemId)) {
            gameStore.setKey('activeItems', JSON.stringify([...active, itemId]));
        }

        // Notify
        const id = Math.random().toString(36).substr(2, 9);
        const newNotif: Notification = {
            id,
            title: `Purchased & Equipped`,
            message: `${item.name} is now active`,
            type: 'unlock'
        };
        notifications.set([...notifications.get(), newNotif]);
        setTimeout(() => {
            notifications.set(notifications.get().filter(n => n.id !== id));
        }, 3000);
    } else {
         // Notify Fail
         const id = Math.random().toString(36).substr(2, 9);
         const newNotif: Notification = {
             id,
             title: `Insufficient Funds`,
             message: `Need ${item.cost} XP`,
             type: 'info'
         };
         notifications.set([...notifications.get(), newNotif]);
         setTimeout(() => {
             notifications.set(notifications.get().filter(n => n.id !== id));
         }, 3000);
    }
};
