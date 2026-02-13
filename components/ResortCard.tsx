
import React from 'react';
import { ResortInfo, ForecastDay } from '../types';
import ResortLogo from './ResortLogo';

interface ResortCardProps {
  resort: ResortInfo;
}

export const WeatherIcon: React.FC<{ condition: string; size?: string }> = ({ condition, size = "w-10 h-10" }) => {
  const cond = condition.toLowerCase();
  
  if ((cond.includes('heavy') && cond.includes('snow')) || cond.includes('blizzard')) {
    return (
      <div className={`${size} text-[#1a2a3a]`}>
        <svg fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      </div>
    );
  }
  
  if (cond.includes('snow')) {
    return (
      <div className={`${size} text-blue-400`}>
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12,2L14,5H10L12,2M12,22L10,19H14L12,22M22,12L19,10V14L22,12M2,12L5,14V10L2,12M17.6,17.6L15.5,14.5L18.6,15.5L17.6,17.6M6.4,6.4L8.5,9.5L5.4,8.5L6.4,6.4M17.6,6.4L14.5,8.5L15.5,5.4L17.6,6.4M6.4,17.6L9.5,14.5L8.5,17.6L6.4,17.6Z"/></svg>
      </div>
    );
  }
  
  if (cond.includes('sun') || cond.includes('clear')) {
    return (
      <div className={`${size} text-[#e60012]`}>
        <svg fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>
      </div>
    );
  }

  return (
    <div className={`${size} text-gray-300`}>
      <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
    </div>
  );
};

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  const next24h = resort.forecast[0]?.snowDepth || 0;
  const isPowderDay = resort.forecast[0]?.lowTemp < 20 && next24h > 4;

  return (
    <div className="washi-card border-l-4 border-l-[#1a2a3a] mb-16 group overflow-hidden">
      {/* Background Pattern Hint */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="#1a2a3a">
          <path d="M0 0 L100 0 L100 100 Z" />
        </svg>
      </div>

      <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 relative z-10">
        <div className="flex items-center gap-8">
          <div className="relative">
            <ResortLogo resortId={resort.id} className="w-20 h-20 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-2 -right-2 hanko-stamp text-[8px] bg-white">
              証
            </div>
          </div>
          
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <h2 className="text-4xl md:text-5xl font-black text-[#1a2a3a] tracking-tight serif-font">{resort.name}</h2>
              {isPowderDay && (
                <div className="hanko-stamp text-[10px] px-3 py-1">
                  新雪
                </div>
              )}
            </div>
            <p className="text-[#c5a059] font-black text-lg tracking-[0.4em] serif-font">{resort.kanjiName}</p>
          </div>
        </div>
        
        <div className="flex gap-10 mt-8 md:mt-0">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1 serif-font">降雪量 <span className="opacity-50">24h</span></p>
            <p className="text-4xl font-black text-[#1a2a3a]">{next24h}"</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1 serif-font">現在積雪 <span className="opacity-50">Base</span></p>
            <p className="text-4xl font-black text-gray-300">{resort.baseDepth.toFixed(0)}"</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1 serif-font">週間合計 <span className="opacity-50">7d</span></p>
            <p className="text-4xl font-black text-[#e60012]">{resort.totalAccumulation.toFixed(1)}"</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-10 bg-gray-50/70 border-r border-gray-100">
          <div className="relative mb-10">
            <p className="text-base text-gray-700 leading-relaxed italic serif-font relative z-10">
              {resort.description}
            </p>
            <div className="absolute -top-4 -left-4 text-6xl text-indigo-900/5 serif-font pointer-events-none">「</div>
            <div className="absolute -bottom-4 -right-4 text-6xl text-indigo-900/5 serif-font pointer-events-none">」</div>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-[11px] text-[#1a2a3a]/60 font-black uppercase tracking-widest mb-3 serif-font">雪質 評価 <span className="text-[9px] opacity-60">Snow Quality</span></p>
              <div className="flex justify-between items-baseline border-b border-indigo-900/5 pb-2">
                <span className="font-bold text-lg text-[#e60012] serif-font">
                  {resort.forecast[0].lowTemp < 15 ? "極上粉雪" : "良質"}
                </span>
                <span className="text-gray-400 text-[10px] font-bold tracking-tighter uppercase">Northern Powder</span>
              </div>
            </div>

            {resort.sources && resort.sources.length > 0 && (
              <div className="pt-6">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3 serif-font">参照 資料 <span className="text-[9px] opacity-60">Verified Sources</span></p>
                <div className="flex flex-col gap-2">
                  {resort.sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-indigo-800 hover:text-red-700 truncate transition-colors font-bold flex items-center gap-2 group/link"
                    >
                      <span className="w-1 h-1 bg-indigo-900/30 group-hover/link:bg-red-600"></span>
                      <span className="serif-font">{source.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-2/3 p-10 bg-white relative">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xs font-black text-[#1a2a3a] tracking-[0.4em] uppercase serif-font">週間 予測 <span className="opacity-40 font-sans ml-2">7-DAY FORECAST</span></h4>
            <div className="flex gap-2">
               <div className="w-1.5 h-1.5 bg-indigo-900/10"></div>
               <div className="w-1.5 h-1.5 bg-indigo-900/20"></div>
               <div className="w-1.5 h-1.5 bg-indigo-900/30"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {resort.forecast.map((day, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-none hover:bg-gray-50/30 transition-all px-4 rounded-sm group/row">
                <div className="w-28">
                  <p className="text-sm font-black text-[#1a2a3a] serif-font">{day.date.split(',')[0]}</p>
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <WeatherIcon condition={day.condition} size="w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">{day.condition}</span>
                  </div>
                </div>
                <div className="flex items-center gap-10 w-48 justify-end">
                   <div className="flex flex-col items-end">
                      <p className="text-[9px] text-gray-300 font-black uppercase mb-1 serif-font">降雪 <span className="font-sans">Snow</span></p>
                      <span className={`text-2xl font-black ${day.snowDepth > 0 ? 'text-[#1a2a3a]' : 'text-gray-100'}`}>
                        {day.snowDepth.toFixed(1)}<span className="text-sm font-normal ml-0.5">"</span>
                      </span>
                   </div>
                   <div className="flex flex-col items-end w-16">
                      <p className="text-[9px] text-gray-300 font-black uppercase mb-1 serif-font">気温 <span className="font-sans">Temp</span></p>
                      <div className="text-xs font-bold leading-tight">
                        <div className="text-[#e60012]">{day.highTemp}°</div>
                        <div className="text-gray-400">{day.lowTemp}°</div>
                      </div>
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
