
import React from 'react';

const TraditionalHeader: React.FC = () => {
  return (
    <header className="relative pt-24 pb-20 px-6 mb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative Brush Stroke Element */}
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none hidden lg:block">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <path d="M10,50 Q40,10 90,50 T10,90" fill="none" stroke="#1a2a3a" strokeWidth="0.5" />
          <path d="M20,50 Q40,30 80,50" fill="none" stroke="#e60012" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Mountain Background Silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-48 opacity-5 pointer-events-none">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full fill-indigo-900">
          <path d="M0,200 L150,80 L300,160 L500,40 L700,140 L850,20 L1000,100 L1000,200 Z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          {/* Main Kanji Title - Vertical Calligraphy Style */}
          <div className="flex flex-col items-center justify-center">
             <div className="text-4xl md:text-5xl font-black text-[#1a2a3a] leading-none tracking-[0.5em] serif-font" style={{ writingMode: 'vertical-rl' }}>
              北海道
             </div>
             <div className="text-2xl font-bold text-[#e60012] mt-4 tracking-widest serif-font" style={{ writingMode: 'vertical-rl' }}>
              雪便り
             </div>
          </div>

          <div className="h-40 w-px bg-indigo-900/10 hidden md:block"></div>

          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-7xl md:text-9xl font-black text-[#1a2a3a] tracking-tighter leading-none mb-4 serif-font">
              HOKKAIDO
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.6em] font-bold text-gray-500">Snow & Peak Data</span>
                <div className="hanko-stamp text-lg">
                  極
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-indigo-900/40 uppercase">
                <span className="w-2 h-2 rotate-45 bg-[#c5a059]"></span>
                Northern Frontier Weather
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#1a2a3a]/20 to-transparent mb-8"></div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] serif-font text-gray-400 tracking-[0.8em] font-bold uppercase">
            厳冬の候、皆様いかがお過ごしでしょうか
          </p>
          <p className="text-[9px] font-bold tracking-[0.2em] text-gray-300 uppercase">
            A Winter Season Transmission from the Sapporo Grid
          </p>
        </div>
      </div>
    </header>
  );
};

export default TraditionalHeader;
