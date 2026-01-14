
import React from 'react';
import { ResortInfo } from '../types';

interface HokkaidoMapProps {
  resorts: ResortInfo[];
  onSelectResort: (resort: ResortInfo) => void;
  selectedResortId?: string;
}

const HokkaidoMap: React.FC<HokkaidoMapProps> = ({ resorts, onSelectResort, selectedResortId }) => {
  // A much more detailed and accurate SVG path for Hokkaido landmass
  const hokkaidoPath = "M 200,680 L 180,690 L 160,710 L 140,710 L 135,690 L 150,650 L 170,640 L 180,610 L 190,580 L 210,540 L 220,510 L 250,520 L 280,550 L 300,580 L 330,590 L 360,600 L 400,590 L 440,560 L 480,520 L 520,500 L 580,480 L 640,460 L 700,430 L 750,400 L 820,385 L 880,360 L 920,320 L 940,280 L 920,240 L 880,220 L 840,200 L 800,180 L 750,150 L 700,130 L 650,120 L 600,140 L 550,160 L 500,200 L 470,240 L 440,280 L 400,310 L 360,330 L 320,350 L 280,370 L 240,400 L 200,430 L 170,450 L 130,470 L 100,490 L 120,510 L 150,530 L 170,560 L 180,590 Z";

  // Major Lakes for realism
  const lakeToya = "M 315,620 A 10,10 0 1,0 335,620 A 10,10 0 1,0 315,620";
  const lakeShikotsu = "M 410,610 A 12,12 0 1,0 434,610 A 12,12 0 1,0 410,610";
  const lakeSaroma = "M 780,250 Q 820,230 850,260 Q 820,280 780,250";
  const lakeMashu = "M 860,320 A 5,5 0 1,0 870,320 A 5,5 0 1,0 860,320";

  const majorCities = [
    { name: 'Sapporo', kanji: '札幌', x: 420, y: 580, population: 'major' },
    { name: 'Asahikawa', kanji: '旭川', x: 590, y: 410, population: 'major' },
    { name: 'Hakodate', kanji: '函館', x: 230, y: 685, population: 'major' },
    { name: 'Kushiro', kanji: '釧路', x: 820, y: 550, population: 'medium' },
    { name: 'Obihiro', kanji: '帯広', x: 680, y: 540, population: 'medium' },
    { name: 'Kitami', kanji: '北見', x: 790, y: 350, population: 'medium' },
    { name: 'Wakkanai', kanji: '稚内', x: 540, y: 150, population: 'small' }
  ];

  const expressways = [
    // Do-O Expressway
    "M 230,685 Q 260,630 420,580 L 590,410 L 540,150",
    // Doto Expressway
    "M 420,580 Q 550,560 680,540 L 820,550",
    // Road to Niseko/South
    "M 420,580 L 320,630 L 230,685"
  ];

  return (
    <div className="relative w-full aspect-[4/3] bg-[#AAD1E6] border-2 border-gray-300 shadow-2xl overflow-hidden rounded-lg group">
      {/* Google Maps Search Bar UI Element */}
      <div className="absolute top-4 left-4 z-30 flex items-center bg-white shadow-md rounded-full px-4 py-2 border border-gray-100 transition-all hover:shadow-lg w-64 md:w-80">
        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input 
          type="text" 
          placeholder="Search Hokkaido Peaks..." 
          className="bg-transparent border-none outline-none text-sm w-full text-gray-600 font-sans"
        />
        <div className="border-l border-gray-200 pl-3 ml-2">
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
        </div>
      </div>

      {/* Layer Control UI Element */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button className="bg-white p-2 shadow-md rounded-md hover:bg-gray-50 border border-gray-200">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-2.286-6.857L2 11l5.714-2.286L10 2l2.286 5.714L18 10l-5.714 2.286L10 20z" /></svg>
        </button>
      </div>

      {/* Zoom Controls UI Element */}
      <div className="absolute bottom-10 right-4 z-30 flex flex-col gap-0.5 bg-white shadow-md rounded-sm border border-gray-200 overflow-hidden">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-xl text-gray-600">+</button>
        <div className="h-px bg-gray-100 mx-2"></div>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-xl text-gray-600">−</button>
      </div>

      <svg viewBox="0 0 1000 750" className="w-full h-full select-none">
        {/* Landmass Shading (Elevation/Forestry) */}
        <path d={hokkaidoPath} fill="#E8F5E9" />
        
        {/* Daisetsuzan / Central Highlands Greenery */}
        <circle cx="600" cy="420" r="80" fill="#C8E6C9" opacity="0.6" />
        <circle cx="350" cy="620" r="50" fill="#C8E6C9" opacity="0.4" />

        {/* Main Land Outline */}
        <path d={hokkaidoPath} fill="none" stroke="#BDC1C6" strokeWidth="1.5" />

        {/* Lakes */}
        <g fill="#AAD1E6" stroke="#9ABCCB" strokeWidth="0.5">
          <path d={lakeToya} />
          <path d={lakeShikotsu} />
          <path d={lakeSaroma} />
          <path d={lakeMashu} />
        </g>

        {/* Urban Area Glows */}
        {majorCities.filter(c => c.population === 'major').map(city => (
          <circle key={`glow-${city.name}`} cx={city.x} cy={city.y} r="35" fill="#FEEFC3" opacity="0.5" />
        ))}

        {/* Highway Network */}
        <g fill="none" strokeLinecap="round">
          {expressways.map((path, i) => (
            <g key={`hwy-${i}`}>
              <path d={path} stroke="#F1F3F4" strokeWidth="6" /> {/* Casing */}
              <path d={path} stroke="#FFD54F" strokeWidth="4" /> {/* Center */}
            </g>
          ))}
        </g>

        {/* City Markers & Labels */}
        {majorCities.map(city => (
          <g key={city.name} className="pointer-events-none">
            <circle cx={city.x} cy={city.y} r={city.population === 'major' ? 4 : 2} fill="#70757A" stroke="white" strokeWidth="1" />
            <text 
              x={city.x + 8} 
              y={city.y + 4} 
              className={`font-sans fill-[#3C4043] ${city.population === 'major' ? 'text-[13px] font-bold' : 'text-[11px]'}`}
            >
              {city.name}
            </text>
            <text 
              x={city.x + 8} 
              y={city.y + 16} 
              className="text-[9px] fill-[#70757A] font-sans"
            >
              {city.kanji}
            </text>
          </g>
        ))}

        {/* Resort Markers - Google Maps Red Pin Style */}
        {resorts.map(resort => {
          const px = resort.coords.x * 10;
          const py = resort.coords.y * 7.5;
          const isSelected = selectedResortId === resort.id;

          return (
            <g
              key={resort.id}
              onClick={() => onSelectResort(resort)}
              className="cursor-pointer transition-transform duration-200 hover:scale-110 origin-center"
            >
              {/* Selected Ring */}
              {isSelected && (
                <circle cx={px} cy={py} r="18" fill="none" stroke="#D93025" strokeWidth="2" className="animate-pulse" />
              )}
              
              {/* Modern Pin Icon */}
              <g transform={`translate(${px}, ${py - 12})`}>
                <path 
                  d="M0 12 C -2 12 -4 10 -4 8 C -4 3.5 0 0 0 0 C 0 0 4 3.5 4 8 C 4 10 2 12 0 12" 
                  fill={isSelected ? "#D93025" : "#4285F4"} 
                  stroke="white" 
                  strokeWidth="0.5" 
                  transform="scale(2)"
                />
                <circle cx="0" cy="16" r="2.5" fill="white" />
              </g>

              {/* High-visibility label for selected or hovered */}
              <g transform={`translate(${px}, ${py - 45})`}>
                <rect 
                  x="-40" y="-12" width="80" height="18" rx="4" 
                  fill={isSelected ? "#D93025" : "white"} 
                  className="shadow-sm border border-gray-200"
                  style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.15))' }}
                />
                <text 
                  textAnchor="middle" 
                  y="1" 
                  className={`text-[9px] font-black uppercase tracking-tight ${isSelected ? 'fill-white' : 'fill-[#3C4043]'}`}
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {resort.name.split(' ')[0]}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Map Information Bar Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-white/80 backdrop-blur-sm px-3 flex items-center justify-between z-30 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-[9px] text-gray-500 font-sans">Scale 1:2,500,000</span>
          <span className="text-[9px] text-gray-400 font-sans">© 2025 Yuki-Hokkaido, Google Search Grounding</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[9px] text-gray-500 font-bold font-sans uppercase">Hokkaido Winter Atlas</span>
           <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Quick Stat Overlay for Hovered/Selected */}
      {selectedResortId && resorts.find(r => r.id === selectedResortId) && (
        <div className="absolute bottom-10 left-4 z-30 bg-white/95 backdrop-blur-md border border-gray-200 p-3 shadow-xl max-w-[200px] animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-black uppercase text-gray-800 truncate">
              {resorts.find(r => r.id === selectedResortId)?.name}
            </h4>
            <div className="bg-blue-100 text-blue-600 px-1 text-[8px] font-bold rounded uppercase">Active</div>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-[8px] text-gray-400 font-bold uppercase">7d Total</p>
              <p className="text-sm font-black text-blue-600">{resorts.find(r => r.id === selectedResortId)?.totalAccumulation.toFixed(1)}"</p>
            </div>
            <div>
              <p className="text-[8px] text-gray-400 font-bold uppercase">Base</p>
              <p className="text-sm font-black text-gray-800">{resorts.find(r => r.id === selectedResortId)?.baseDepth.toFixed(0)}"</p>
            </div>
          </div>
          <p className="text-[8px] text-gray-400 font-medium mt-1 uppercase italic">Click Peak for details</p>
        </div>
      )}
    </div>
  );
};

export default HokkaidoMap;
