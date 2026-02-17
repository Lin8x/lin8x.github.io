import React from 'react';
import { useStore } from '@nanostores/react';
import { gameStore, notifications, dismissNotification } from '../../store/gameStore';
import { Trophy, Zap, Terminal, X, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function HUD() {
  const state = useStore(gameStore);
  const notes = useStore(notifications);

  if (state.gameEnabled !== 'true') return null;

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'unlock':
        return { 
          border: 'border-yellow-500', 
          glow: 'bg-yellow-500', 
          bg: 'bg-gradient-to-r from-yellow-900/50 to-amber-900/50',
          icon: <Sparkles className="text-yellow-400 shrink-0 animate-pulse" size={22} /> 
        };
      case 'success':
        return { 
          border: 'border-green-500', 
          glow: 'bg-green-500', 
          bg: 'bg-gradient-to-r from-green-900/40 to-emerald-900/40',
          icon: <CheckCircle className="text-green-400 shrink-0" size={20} /> 
        };
      case 'error':
        return { 
          border: 'border-red-500', 
          glow: 'bg-red-500', 
          bg: 'bg-gradient-to-r from-red-900/40 to-rose-900/40',
          icon: <AlertCircle className="text-red-400 shrink-0" size={20} /> 
        };
      default:
        return { 
          border: 'border-brand-primary', 
          glow: 'bg-brand-primary', 
          bg: 'bg-gray-900/95',
          icon: <Terminal className="text-brand-primary shrink-0" size={20} /> 
        };
    }
  };

  return (
    <>
      {/* Top Right Score Display */}
      <div className="fixed top-20 right-4 md:top-4 md:right-4 z-50 flex items-center gap-3 animate-slide-in-top">
        <div className="bg-black/50 backdrop-blur-md border border-brand-primary/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-brand-primary/10">
          <Trophy size={16} className="text-yellow-500" />
          <span className="font-mono font-bold text-white tracking-widest">{state.points.padStart(4, '0')} XP</span>
        </div>
      </div>

      {/* Notification Toast Container - Achievement Style */}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-3 pointer-events-none max-w-sm">
        {notes.map(note => {
          const styles = getNotificationStyles(note.type);
          const isAchievement = note.type === 'unlock';
          
          return (
            <div 
              key={note.id} 
              className={`
                pointer-events-auto w-80 backdrop-blur-sm border-2 rounded-xl shadow-2xl relative overflow-hidden animate-toast-in
                ${styles.border} ${styles.bg}
                ${isAchievement ? 'shadow-yellow-500/20' : ''}
              `}
            >
              {/* Shimmer effect for achievements */}
              {isAchievement && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              )}
              
              {/* Progress bar */}
              <div className={`absolute bottom-0 left-0 h-1 ${styles.glow} animate-toast-progress`} />
              
              {/* Content */}
              <div className="p-4 flex items-start gap-3 relative z-10">
                <div className={`${isAchievement ? 'p-2 bg-yellow-500/20 rounded-lg' : ''}`}>
                  {styles.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold uppercase tracking-wider ${isAchievement ? 'text-yellow-300 text-base' : 'text-white text-sm'}`}>
                    {note.title}
                  </h4>
                  <p className={`mt-1 ${isAchievement ? 'text-yellow-200/70 text-sm' : 'text-gray-400 text-xs'}`}>
                    {note.message}
                  </p>
                </div>
                <button 
                  onClick={() => dismissNotification(note.id)}
                  className="text-gray-500 hover:text-white transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Background Glow */}
              <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${styles.glow}`} />
            </div>
          );
        })}
      </div>
    </>
  );
}
