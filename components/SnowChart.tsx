
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ForecastDay } from '../types';

interface SnowChartProps {
  data: ForecastDay[];
}

const SnowChart: React.FC<SnowChartProps> = ({ data }) => {
  return (
    <div className="h-48 w-full mt-6 bg-black/60 p-6 rounded-sm border border-neon-cyan/10">
      <h4 className="text-[10px] font-mono text-gray-600 mb-4 uppercase tracking-[0.3em]">SNOW_WAVEFORM_ANALYSIS (IN)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="date" 
            tick={{fontSize: 9, fill: '#444', fontFamily: 'Fira Code'}} 
            axisLine={{stroke: '#222'}} 
            tickLine={false} 
          />
          <YAxis 
            tick={{fontSize: 9, fill: '#444', fontFamily: 'Fira Code'}} 
            axisLine={{stroke: '#222'}} 
            tickLine={false} 
          />
          <Tooltip 
            cursor={{fill: 'rgba(255, 255, 255, 0.03)'}}
            contentStyle={{ backgroundColor: '#000', border: '1px solid #00ffff', fontSize: '10px', color: '#fff', fontFamily: 'Fira Code', borderRadius: '0' }}
            itemStyle={{ color: '#00ffff' }}
            formatter={(value: number) => [`${value.toFixed(1)}"`, 'INTENSITY']}
          />
          <Bar dataKey="snowDepth">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.snowDepth > 5 ? '#ff00ff' : '#00ffff'} fillOpacity={0.6} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SnowChart;
