
import React from 'react';
import { ResortInfo } from '../types';

interface HokkaidoMapProps {
  resorts: ResortInfo[];
  onSelectResort: (resort: ResortInfo) => void;
  selectedResortId?: string;
}

const HokkaidoMap: React.FC<HokkaidoMapProps> = ({ resorts, onSelectResort, selectedResortId }) => {
  const hokkaidoPath = "M 200,680 L 180,690 L 160,710 L 140,710 L 135,690 L 150,650 L 170,640 L 180,610 L 190,580 L 210,540 L 220,510 L 250,520 L 280,550 L 300,580 L 330,590 L 360,600 L 400,590 L 440,560 L 480,520 L 520,500 L 580,480 L 640,460 L 700,430 L 750,400 L 820,385 L 880,360 L 920,320 L 940,280 L 920,240 L 880,220 L 840,200 L 800,180 L 750,150 L 700,130 L 650,120 L 600,140 L 550,160 L 500,200 L 470,240 L 440,280 L 400,310 L 360,330 L 320,350 L 280,370 L 240,400 L 200,430 L 170,450 L 130,470 L 100,490 L 120,510 L 150,530 L 170,560 L 180,590 Z";

  return (
    <div className="relative w-full aspect-[4/3] bg-white washi-card border-none overflow-hidden group mb-16">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-xl font-black text-[#1a2a3a] tracking-widest uppercase">Peak Grid</h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Topographical Reference</p>
      </div>

      <svg viewBox="0 0 1000 750" className="w-full h-full select-none">
        {/* Landmass with Sumi-e feel */}
        <path d={hokkaidoPath} fill="#f8f8f8" stroke="#1a2a3a" strokeWidth="2" strokeLinejoin="round" />
        <path d={hokkaidoPath} fill="url(#inkWash)" opacity="0.1" />

        <defs>
          <radialGradient id="inkWash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a2a3a" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Resort Markers */}
        {resorts.map(resort => {
          const px = resort.coords.x * 10;
          const py = resort.coords.y * 7.5;
          const isSelected = selectedResortId === resort.id;

          return (
            <g
              key={resort.id}
              onClick={() => onSelectResort(resort)}
              className="cursor-pointer transition-all duration-300"
            >
              {isSelected && (
                <circle cx={px} cy={py} r="12" fill="none" stroke="#e60012" strokeWidth="1" strokeDasharray="2 2" />
              )}
              
              <circle 
                cx={px} 
                cy={py} 
                r={isSelected ? "5" : "3"} 
                fill={isSelected ? "#e60012" : "#1a2a3a"} 
                className="transition-all"
              />

              <g transform={`translate(${px}, ${py - 15})`}>
                <text 
                  textAnchor="middle" 
                  className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'fill-[#e60012]' : 'fill-gray-400'}`}
                >
                  {resort.name.split(' ')[0]}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default HokkaidoMap;
