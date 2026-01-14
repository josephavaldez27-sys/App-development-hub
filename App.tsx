
import React, { useState, useEffect, useCallback, useRef } from 'react';
import NeonHeader from './components/TraditionalHeader';
import ResortCard from './components/ResortCard';
import { Resort, ResortInfo } from './types';
import { fetchAllResortsData } from './services/geminiService';

const App: React.FC = () => {
  const [resorts, setResorts] = useState<ResortInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResortId, setSelectedResortId] = useState<string | undefined>();
  const resortRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const targetResorts = [
        Resort.NISEKO,
        Resort.RUSUTSU,
        Resort.KIRORO,
        Resort.TEINE,
        Resort.FURANO,
        Resort.TOMAMU,
        Resort.SAHORO,
        Resort.ASAHIDAKE,
        Resort.KAMUI
      ];

      const results = await fetchAllResortsData(targetResorts);
      setResorts(results);
    } catch (err: any) {
      console.error("Failed to fetch snow data:", err);
      setError("COMMUNICATION_ERROR: ALLEYWAY_SIGNAL_LOST_IN_BLIZZARD");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectResort = (resortId: string) => {
    setSelectedResortId(resortId);
    resortRefs.current[resortId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="max-w-6xl mx-auto pb-32 px-4 relative">
      <NeonHeader />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <div className="relative w-40 h-40 flex items-center justify-center">
             {/* Spinning Neon Rings */}
             <div className="absolute inset-0 border-2 border-neon-pink rounded-full border-t-transparent animate-spin"></div>
             <div className="absolute inset-4 border-2 border-neon-cyan rounded-full border-b-transparent animate-reverse-spin"></div>
             
             <div className="text-4xl neon-text-cyan font-black">SCAN</div>
          </div>
          <div className="mt-12 text-center">
             <h3 className="text-4xl font-black italic neon-text-pink tracking-widest mb-2 flicker">BOOTING_TERMINAL</h3>
             <p className="font-mono text-xs text-gray-500 tracking-[0.6em] uppercase">Connecting to Hokkaido Snow Grid...</p>
             <div className="flex gap-2 justify-center mt-6">
                <div className="w-2 h-2 bg-neon-cyan animate-pulse"></div>
                <div className="w-2 h-2 bg-neon-pink animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-neon-yellow animate-pulse" style={{animationDelay: '0.4s'}}></div>
             </div>
          </div>

          <style>{`
            @keyframes reverse-spin {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            .animate-reverse-spin { animation: reverse-spin 1s linear infinite; }
          `}</style>
        </div>
      ) : error ? (
        <div className="bg-black/80 border-2 border-neon-pink p-12 text-center max-w-xl mx-auto shadow-[0_0_50px_rgba(255,0,255,0.2)]">
          <p className="text-2xl mb-8 font-black neon-text-pink uppercase tracking-widest">{error}</p>
          <button 
            onClick={loadData}
            className="bg-neon-pink text-white px-10 py-4 rounded-none hover:bg-white hover:text-black transition-all uppercase tracking-[0.5em] font-black shadow-[0_0_20px_rgba(255,0,255,0.5)]"
          >
            RETRY_SIGNAL
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Neon Jump Menu */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {resorts.map(r => (
              <button 
                key={r.id}
                onClick={() => handleSelectResort(r.id)}
                className={`px-5 py-2 text-[10px] font-mono uppercase tracking-[0.3em] border transition-all ${selectedResortId === r.id ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.8)]' : 'bg-black/40 text-gray-500 border-gray-800 hover:border-neon-cyan hover:text-neon-cyan'}`}
              >
                {r.name.split(' ')[0]} {r.forecast[0]?.snowDepth > 6 ? '⚡' : ''}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 animate-in fade-in duration-1000">
            {resorts.map(resort => (
              <div 
                key={resort.id} 
                ref={el => resortRefs.current[resort.id] = el}
                className="transition-all duration-500"
              >
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>

          <div className="text-center mt-32 opacity-20 hover:opacity-100 transition-opacity duration-1000">
             <div className="inline-block p-8 border border-white/5 bg-black/40 backdrop-blur-md">
                <p className="text-[10px] font-mono tracking-[1em] text-white uppercase mb-4">END_OF_TRANSMISSION</p>
                <p className="font-black italic text-neon-pink text-3xl">STAY_FROSTY</p>
                <div className="flex justify-center gap-6 mt-6">
                   <div className="w-4 h-1 bg-neon-cyan"></div>
                   <div className="w-4 h-1 bg-neon-pink"></div>
                   <div className="w-4 h-1 bg-neon-yellow"></div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Persistent Alleyway Decor */}
      <div className="fixed top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none opacity-50"></div>
      <div className="fixed top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none opacity-50"></div>

      {/* Refresh Button as a Floating Neon Switch */}
      <button 
        onClick={loadData}
        disabled={loading}
        className="fixed bottom-12 right-12 w-16 h-16 rounded-full bg-black border-2 border-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 neon-text-cyan ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
};

export default App;
