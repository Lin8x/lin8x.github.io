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
  type: 'success' | 'info' | 'unlock' | 'error';
};

export const notifications = atom<Notification[]>([]);

// Reusable notification helper
export const addNotification = (
  title: string, 
  message: string, 
  type: 'success' | 'info' | 'unlock' | 'error' = 'info',
  duration: number = 3000
) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newNotif: Notification = { id, title, message, type };
  notifications.set([...notifications.get(), newNotif]);

  if (duration > 0) {
    setTimeout(() => {
      notifications.set(notifications.get().filter(n => n.id !== id));
    }, duration);
  }

  return id; // Return id in case caller wants to dismiss early
};

// Dismiss a specific notification
export const dismissNotification = (id: string) => {
  notifications.set(notifications.get().filter(n => n.id !== id));
};

export const addPoints = (amount: number, reason: string) => {
  const current = parseInt(gameStore.get().points);
  const newVal = current + amount;
  gameStore.setKey('points', newVal.toString());

  addNotification(`+${amount} XP`, reason || 'Points acquired', 'success');
};

export const resetGame = () => {
    addNotification('System Reset', 'All progress has been wiped. Starting fresh...', 'error', 2000);
    
    setTimeout(() => {
        gameStore.set({
            points: '0',
            secretsFound: '[]',
            unlockedItems: '[]',
            activeItems: '[]',
            theme: 'default',
            gameEnabled: 'true'
        });
        window.location.reload();
    }, 1500);
};

// Secret/Achievement tracking
export const findSecret = (secretId: string, points: number = 100) => {
    const secrets = JSON.parse(gameStore.get().secretsFound || '[]') as string[];
    
    if (secrets.includes(secretId)) {
        return false; // Already found
    }
    
    // Add to found secrets
    const newSecrets = [...secrets, secretId];
    gameStore.setKey('secretsFound', JSON.stringify(newSecrets));
    
    // Award points
    const current = parseInt(gameStore.get().points);
    gameStore.setKey('points', (current + points).toString());
    
    // Show achievement notification
    addNotification('🎉 Secret Found!', `+${points} XP earned`, 'unlock', 4000);
    
    return true;
};

export const hasFoundSecret = (secretId: string): boolean => {
    const secrets = JSON.parse(gameStore.get().secretsFound || '[]') as string[];
    return secrets.includes(secretId);
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
    { id: 'theme_minecraft', name: 'Minecraft Theme', cost: 500, description: 'Blocky pixel aesthetic. Overrides Matrix Mode.' },
    { id: 'theme_rainbow', name: 'Rainbow Mode', cost: 2500, description: 'Ultimate visual override. Animated rainbow background.' },
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

        // Notify success
        addNotification('Purchased & Equipped', `${item.name} is now active`, 'unlock');
    } else {
        // Notify insufficient funds
        addNotification('Insufficient Funds', `Need ${item.cost} XP`, 'error');
    }
};
