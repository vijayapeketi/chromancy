import React from 'react';
import { AuraResult } from '../types';
import { Music, Sparkles } from 'lucide-react';

interface AuraCardProps {
  data: AuraResult;
  imageSrc: string;
  onReset: () => void;
}

const AuraCard: React.FC<AuraCardProps> = ({ data, imageSrc, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up px-4">
      {/* The Card */}
      <div className="relative rounded-[2rem] overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 transition-all duration-500 flex flex-col">
        
        {/* Dynamic Border Gradient */}
        <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
                background: `linear-gradient(135deg, ${data.primaryColor}, ${data.secondaryColor})`
            }}
        />

        {/* Image Header */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
            <img src={imageSrc} alt="Analysis" className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105" />
            
            <div className="absolute bottom-4 left-6 right-6 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-2 shadow-lg">
                    <span className="text-xl md:text-2xl">{data.emoji}</span>
                    <span className="text-sm font-bold uppercase tracking-wider text-white/95">{data.auraName}</span>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 md:space-y-8 relative z-10">
            
            {/* Main Grid: Palette & Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                
                 {/* Color Palette */}
                <div className="flex flex-col gap-4 bg-white/5 rounded-2xl p-5 border border-white/5 shadow-inner md:col-span-5">
                    <span className="text-xs text-white/40 uppercase tracking-widest font-semibold text-center md:text-left">Energy Palette</span>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        {[data.primaryColor, data.secondaryColor, data.accentColor].map((color, i) => (
                            <div key={i} className="group relative flex flex-col items-center">
                                <div 
                                    className="w-14 h-14 rounded-full shadow-lg border-2 border-white/10 transition-transform duration-300 hover:scale-110 hover:border-white/30"
                                    style={{ backgroundColor: color }}
                                />
                                <div className="mt-2 text-[10px] text-white/50 font-mono uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                                    {color}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col justify-center space-y-3 md:col-span-7">
                    <h4 className="flex items-center gap-2 text-white/90 font-semibold text-lg">
                        <Sparkles size={18} className="text-yellow-200 animate-pulse" />
                        The Reading
                    </h4>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed italic border-l-2 border-white/10 pl-4">
                        "{data.description}"
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 w-full" />

            {/* Playlist Section */}
            <div className="bg-gradient-to-r from-white/5 to-transparent p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shrink-0">
                            <Music size={20} className="text-white" />
                        </div>
                        <div className="truncate">
                            <div className="text-[10px] uppercase text-white/40 tracking-wider mb-0.5">Sonic Identity</div>
                            <div className="text-white font-medium text-sm md:text-base truncate">{data.playlistName}</div>
                        </div>
                    </div>
                    {/* Visualizer bars simulation */}
                    <div className="flex items-end gap-1 h-6 shrink-0">
                        <div className="w-1 bg-green-400/80 rounded-t-sm h-3 animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 bg-green-400/80 rounded-t-sm h-5 animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 bg-green-400/80 rounded-t-sm h-2 animate-pulse" style={{ animationDelay: '300ms' }} />
                        <div className="w-1 bg-green-400/80 rounded-t-sm h-4 animate-pulse" style={{ animationDelay: '75ms' }} />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-2">
                <button 
                    onClick={onReset}
                    className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold tracking-wide transition-all border border-white/10 hover:border-white/30 shadow-lg active:scale-95"
                >
                    Analyze Another Vibe
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuraCard;
