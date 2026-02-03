import React from 'react';
import { useStore } from '@nanostores/react';
import { gameStore, notifications } from '../../store/gameStore';
import { Trophy, Zap, Terminal } from 'lucide-react';

export default function HUD() {
  const state = useStore(gameStore);
  const notes = useStore(notifications);

  if (state.gameEnabled !== 'true') return null;

  return (
    <>
      {/* Top Right Score Display */}
      <div className="fixed top-20 right-4 md:top-4 md:right-4 z-50 flex items-center gap-3 animate-slide-in-top">
        <div className="bg-black/50 backdrop-blur-md border border-brand-primary/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-brand-primary/10">
          <Trophy size={16} className="text-yellow-500" />
          <span className="font-mono font-bold text-white tracking-widest">{state.points.padStart(4, '0')} XP</span>
        </div>
      </div>

      {/* Notification Toast Container */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 pointer-events-none">
        {notes.map(note => (
            <div 
                key={note.id} 
                className={`
                    pointer-events-auto w-72 bg-gray-900 border rounded-lg p-4 shadow-2xl relative overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300
                    ${note.type === 'unlock' ? 'border-yellow-500' : 'border-brand-primary'}
                `}
            >
                {/* Progress bar animation could go here */}
                <div className="flex items-start gap-3 relative z-10">
                    {note.type === 'unlock' ? <Zap className="text-yellow-500" size={20} /> : <Terminal className="text-brand-primary" size={20} />}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{note.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{note.message}</p>
                    </div>
                </div>
                
                {/* Background Glow */}
                <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-20 ${note.type === 'unlock' ? 'bg-yellow-500' : 'bg-brand-primary'}`}></div>
            </div>
        ))}
      </div>
    </>
  );
}
