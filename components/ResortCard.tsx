
import React from 'react';
import { ResortInfo, ForecastDay } from '../types';

interface ResortCardProps {
  resort: ResortInfo;
}

export const WeatherIcon: React.FC<{ condition: string; size?: string }> = ({ condition, size = "w-6 h-6" }) => {
  const cond = condition.toLowerCase();
  
  // Heavy Snow / Blizzard
  if ((cond.includes('heavy') && cond.includes('snow')) || cond.includes('blizzard') || cond.includes('storm')) {
    return (
      <div className={`${size} neon-text-pink`}>
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 11h-4.18L17 8.82l-1.42-1.42L13 10.03V5h-2v5.03L8.42 7.41 7 8.82l2.18 2.18H5v2h4.18L7 15.18l1.42 1.42L11 13.97V19h2v-5.03l2.58 2.58 1.42-1.42-2.18-2.18H19v-2z"/>
          <circle cx="5" cy="18" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="19" cy="18" r="1.5"/>
        </svg>
      </div>
    );
  }
  
  // Standard / Light Snow
  if (cond.includes('snow')) {
    return (
      <div className={`${size} neon-text-cyan`}>
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.5,12c0,1.38-1.12,2.5-2.5,2.5s-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5S14.5,10.62,14.5,12z M12,3c-0.55,0-1,0.45-1,1v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V4C13,3.45,12.55,3,12,3z M12,17c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2 C13,17.45,12.55,17,12,17z M21,12c0-0.55-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1s0.45,1,1,1h2C20.55,13,21,12.55,21,12z M6,12 c0-0.55-0.45-1-1-1H3c-0.55,0-1,0.45-1,1s0.45,1,1,1h2C5.55,13,6,12.55,6,12z"/>
        </svg>
      </div>
    );
  }
  
  // Sunny / Clear
  if (cond.includes('sun') || cond.includes('clear')) {
    return (
      <div className={`${size} neon-text-yellow`}>
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
      </div>
    );
  }

  // Partly Cloudy
  if (cond.includes('part') || cond.includes('mostly sun')) {
    return (
      <div className={`${size} relative`}>
        <div className="absolute -top-1 -right-1 neon-text-yellow opacity-80">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>
        </div>
        <div className="text-gray-400">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
        </div>
      </div>
    );
  }

  // Rain / Sleet / Showers
  if (cond.includes('rain') || cond.includes('sleet') || cond.includes('shower')) {
    return (
      <div className={`${size} text-blue-500`}>
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM9 13v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1zm4 0v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1zm4 0v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1z"/>
        </svg>
      </div>
    );
  }

  // Cloudy / Overcast / Fog
  return (
    <div className={`${size} text-gray-500`}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    </div>
  );
};

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  const next24h = resort.forecast[0]?.snowDepth || 0;
  const isPowderDay = resort.forecast[0]?.lowTemp < 20 && next24h > 4;

  return (
    <div className="bg-[#0c0c0e] border-2 border-neon-cyan/20 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden transition-all hover:border-neon-pink/40 hover:shadow-[0_0_40px_rgba(255,0,255,0.1)] group/card relative mb-12">
      {/* Glow Overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] pointer-events-none group-hover/card:bg-neon-pink/5 transition-colors duration-700"></div>
      
      {/* Header Section as a Lightbox */}
      <div className="bg-black/80 p-8 flex flex-col md:flex-row md:items-center justify-between border-b border-neon-cyan/20 relative">
        <div className="flex flex-col relative z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
              {resort.name}
            </h2>
            {isPowderDay && (
              <div className="bg-neon-pink text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(255,0,255,0.8)]">
                POWDER_SCAN
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-neon-cyan font-mono text-xs tracking-[0.4em] uppercase">{resort.kanjiName}</span>
            <div className="h-[1px] w-12 bg-neon-cyan/30"></div>
            <span className="text-xs font-mono text-gray-500">LIVE_DATA_FEED</span>
          </div>
        </div>
        
        <div className="flex gap-4 md:gap-8 mt-6 md:mt-0 relative z-10">
          {[
            { label: 'NEXT_24H', val: `${next24h}"`, color: 'neon-text-pink' },
            { label: '7D_TOTAL', val: `${resort.totalAccumulation.toFixed(1)}"`, color: 'text-white' },
            { label: 'BASE_DEPTH', val: `${resort.baseDepth.toFixed(0)}"`, color: 'neon-text-cyan' }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <p className="text-[9px] font-mono text-gray-500 mb-1 tracking-widest uppercase">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>
                {stat.val}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Detail Display */}
        <div className="lg:w-1/3 p-8 border-r border-neon-cyan/10 bg-black/40">
          <div className="bg-white/5 border border-white/10 p-4 mb-8">
            <p className="text-gray-400 text-xs font-mono leading-relaxed italic">
              "{resort.description}"
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="group/stat">
               <p className="text-[9px] font-mono text-gray-600 mb-1 tracking-widest uppercase">STATION_DISTANCE</p>
               <div className="flex items-center justify-between border-b border-gray-800 pb-2 group-hover/stat:border-neon-cyan/50 transition-colors">
                  <span className="text-white font-bold text-sm uppercase">{resort.distanceFromNakajima}</span>
                  <span className="text-[10px] neon-text-cyan">🚗 {resort.travelTime}</span>
               </div>
            </div>
            <div className="group/stat">
               <p className="text-[9px] font-mono text-gray-600 mb-1 tracking-widest uppercase">SNOW_STRUCTURE</p>
               <div className="flex items-center justify-between border-b border-gray-800 pb-2 group-hover/stat:border-neon-pink/50 transition-colors">
                  <span className="text-neon-pink font-bold text-sm uppercase">
                    {resort.forecast[0].lowTemp < 15 ? "ULTRA_POWDER" : "WET_DENSITY"}
                  </span>
                  <span className="text-[10px] neon-text-pink">❄️ CRYSTALLIZED</span>
               </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Atmospheric Sensor #0{Math.floor(Math.random()*9)}</div>
          </div>
        </div>

        {/* Right Side: Data Feed Grid */}
        <div className="lg:w-2/3 p-8 scanlines bg-black/20">
          <div className="grid grid-cols-1 gap-1">
            <div className="flex justify-between items-center px-4 py-2 border-b border-neon-cyan/10 mb-4">
               <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">7_DAY_SCANNER</span>
               <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_5px_#00ffff]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-pink shadow-[0_0_5px_#ff00ff]"></div>
               </div>
            </div>
            
            {resort.forecast.map((day, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none group/row">
                <div className="w-24">
                  <p className="text-xs font-mono text-white tracking-widest uppercase">{day.date.split(',')[0] || day.date}</p>
                </div>
                <div className="flex items-center gap-3 flex-1 px-4">
                  <WeatherIcon condition={day.condition} />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter truncate max-w-[80px]">{day.condition}</span>
                </div>
                <div className="flex items-center gap-4 w-32 justify-end">
                   <div className="flex flex-col items-end">
                      <span className={`text-xl font-black font-mono leading-none ${day.snowDepth > 0 ? 'neon-text-cyan' : 'text-gray-800'}`}>
                        {day.snowDepth.toFixed(1)}"
                      </span>
                      <div className="flex gap-1 mt-1">
                         {Array.from({ length: Math.ceil(day.snowDepth) }).map((_, idx) => (
                            <div key={idx} className="w-1 h-2 bg-neon-cyan shadow-[0_0_5px_#00ffff] opacity-50"></div>
                         ))}
                      </div>
                   </div>
                   <div className="flex flex-col text-[10px] font-mono w-10">
                      <span className="neon-text-pink">{day.highTemp}°</span>
                      <span className="text-gray-500">{day.lowTemp}°</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortCard;
