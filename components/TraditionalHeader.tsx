
import React from 'react';

const NeonHeader: React.FC = () => {
  return (
    <header className="relative pt-16 pb-12 px-6 mb-16 flex flex-col items-center justify-center">
      {/* Background Neon "Glow" behind the signs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-32 bg-neon-pink/10 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main Neon Sign */}
        <div className="relative mb-8 group">
          <div className="flex gap-4 items-end">
             {/* Vertical Japanese Katakana Sign */}
             <div className="flex flex-col gap-1 px-3 py-6 bg-black border-2 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,255,255,0.2)] rounded-sm">
                <span className="text-2xl font-black neon-text-cyan leading-none" style={{ writingMode: 'vertical-rl' }}>ユキ</span>
                <span className="text-2xl font-black neon-text-cyan leading-none" style={{ writingMode: 'vertical-rl' }}>タミナル</span>
             </div>

             {/* Main Title Sign */}
             <div className="flex flex-col items-start">
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter italic neon-text-pink leading-none flicker" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                  HOKKAIDO
                </h1>
                <div className="bg-neon-cyan px-4 py-1 mt-2 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                   <span className="text-black font-black text-sm tracking-[0.4em] uppercase">HOKKAIDO_TERMINAL_V4</span>
                </div>
             </div>
          </div>
        </div>

        {/* Info Grid like small neon displays */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
           <div className="flex items-center gap-2 bg-black/60 border-l-4 border-neon-yellow px-4 py-2">
              <span className="text-[10px] font-mono text-gray-500 tracking-widest">NETWORK:</span>
              <span className="text-xs font-black neon-text-yellow animate-pulse">ALLEY_GATEWAY_03</span>
           </div>
           <div className="flex items-center gap-2 bg-black/60 border-l-4 border-neon-cyan px-4 py-2">
              <span className="text-[10px] font-mono text-gray-500 tracking-widest">STATUS:</span>
              <span className="text-xs font-black neon-text-cyan">SUBZERO_FLOW</span>
           </div>
           <div className="flex items-center gap-2 bg-black/60 border-l-4 border-neon-pink px-4 py-2">
              <span className="text-xs font-black neon-text-pink uppercase tracking-widest">DATA_FEED_ACTIVE</span>
           </div>
        </div>
      </div>
    </header>
  );
};

export default NeonHeader;
