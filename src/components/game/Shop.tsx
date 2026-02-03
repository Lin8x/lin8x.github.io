import React, { useState, useEffect } from 'react';
import { ShoppingBag, Lock, Check, Power, RefreshCw } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { gameStore, buyItem, toggleItem, resetGame, SHOP_ITEMS } from '../../store/gameStore';

export default function Shop() {
  const [isOpen, setIsOpen] = useState(false);
  const $gameStore = useStore(gameStore);
  const unlocked = JSON.parse($gameStore.unlockedItems || '[]') as string[];
  const active = JSON.parse($gameStore.activeItems || '[]') as string[];

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-shop-modal', handleOpen);
    return () => window.removeEventListener('open-shop-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-xl shadow-2xl relative overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/50 shrink-0">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="text-brand-primary" />
                    Marketplace
                </h2>
                <p className="text-gray-400 text-sm">Spend your hard-earned XP on upgrades.</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Close</button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto font-sans flex-grow">
            {SHOP_ITEMS.map(item => {
                const isOwned = unlocked.includes(item.id);
                const isActive = active.includes(item.id);
                const canAfford = parseInt($gameStore.points) >= item.cost;

                return (
                    <div key={item.id} className={`p-4 rounded-lg border flex flex-col justify-between ${isOwned ? 'bg-brand-primary/5 border-brand-primary/30' : 'bg-gray-800 border-gray-700'}`}>
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-white">{item.name}</h3>
                                {isOwned && <Check size={16} className="text-brand-primary" />}
                            </div>
                            <p className="text-xs text-gray-400 mb-4">{item.description}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2 border-t border-gray-700/50 pt-3">
                            <span className="text-sm font-mono text-brand-primary font-bold">{item.cost} XP</span>
                            
                            {isOwned ? (
                                <button 
                                    onClick={() => toggleItem(item.id)}
                                    className={`px-3 py-1 text-xs rounded font-bold transition flex items-center gap-1
                                        ${isActive 
                                            ? 'bg-green-500/20 text-green-500 border border-green-500/50 hover:bg-green-500/30' 
                                            : 'bg-gray-700 text-gray-400 hover:text-white'}
                                    `}
                                >
                                    <Power size={12} />
                                    {isActive ? 'ENABLED' : 'DISABLED'}
                                </button>
                            ) : (
                                <button 
                                    onClick={() => buyItem(item.id)}
                                    disabled={!canAfford}
                                    className={`px-3 py-1 text-xs rounded font-bold transition flex items-center gap-1
                                        ${canAfford 
                                            ? 'bg-brand-primary text-black hover:bg-white' 
                                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
                                    `}
                                >
                                    {!canAfford && <Lock size={12} />}
                                    BUY
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-800/50 flex justify-between items-center text-xs border-t border-gray-800 shrink-0">
             <div className="text-gray-500">
                Balance: <span className="text-white font-bold text-lg ml-1">{parseInt($gameStore.points)} XP</span>
             </div>
             
             <button 
                onClick={() => { if(confirm("Are you sure? This will wipe all progress.")) resetGame(); }}
                className="flex items-center gap-1 text-red-500 hover:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition"
             >
                <RefreshCw size={12} />
                Reset System
             </button>
        </div>
      </div>
    </div>
  );
}
