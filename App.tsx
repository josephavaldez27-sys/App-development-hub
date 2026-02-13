
import React, { useState, useEffect, useCallback, useRef } from 'react';
import TraditionalHeader from './components/TraditionalHeader';
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
      setError("接続に失敗しました。天候を確認してください。");
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
    <div className="max-w-6xl mx-auto pb-48 px-4 relative">
      <TraditionalHeader />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-60 animate-clean">
          <div className="relative mb-12">
            <div className="w-20 h-20 border-[1px] border-indigo-900/10 rounded-full flex items-center justify-center">
               <div className="w-12 h-12 border border-transparent border-t-[#e60012] rounded-full animate-spin"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hanko-stamp text-xs bg-white">
              待
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#1a2a3a] tracking-[0.5em] uppercase serif-font">情報を取得中</h3>
          <p className="text-[10px] text-gray-400 mt-4 tracking-[0.3em] font-medium">SYNCHRONIZING WITH HOKKAIDO SNOW GRID</p>
        </div>
      ) : error ? (
        <div className="washi-card p-16 text-center max-w-xl mx-auto border-t-2 border-t-[#e60012] animate-clean">
          <div className="hanko-stamp text-2xl mb-8">誤</div>
          <p className="text-xl mb-10 font-black text-[#1a2a3a] serif-font">{error}</p>
          <button 
            onClick={loadData}
            className="bg-[#1a2a3a] text-white px-10 py-3 font-bold hover:bg-[#e60012] transition-all uppercase text-[10px] tracking-[0.4em]"
          >
            再試行 Retry
          </button>
        </div>
      ) : (
        <div className="space-y-16 animate-clean">
          {/* Minimal Jump Menu - More traditional and cleaner feel */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 mb-24 border-b border-indigo-900/5 pb-12">
            {resorts.map(r => (
              <button 
                key={r.id}
                onClick={() => handleSelectResort(r.id)}
                className={`group flex flex-col items-center gap-1 transition-all ${selectedResortId === r.id ? 'scale-105' : 'hover:scale-105'}`}
              >
                <span className={`text-[9px] font-bold tracking-widest transition-colors ${selectedResortId === r.id ? 'text-[#e60012]' : 'text-gray-300'}`}>
                  {r.name.split(' ')[0]}
                </span>
                <span className={`text-base font-black serif-font transition-colors ${selectedResortId === r.id ? 'text-[#1a2a3a]' : 'text-indigo-900/20'}`}>
                  {r.kanjiName.slice(0, 2)}
                </span>
                <div className={`h-[1px] w-0 group-hover:w-full transition-all duration-500 ${selectedResortId === r.id ? 'w-full bg-[#e60012]' : 'bg-[#1a2a3a]/10'}`}></div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-20">
            {resorts.map(resort => (
              <div 
                key={resort.id} 
                ref={el => resortRefs.current[resort.id] = el}
                className="transition-all duration-1000"
              >
                <ResortCard resort={resort} />
              </div>
            ))}
          </div>

          <div className="text-center mt-64 border-t border-indigo-900/5 pt-32 relative overflow-hidden">
             {/* Clean wave pattern only at the footer area */}
             <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none pattern-seigaiha-faint"></div>
             
             <div className="relative z-10 inline-block px-12 py-10">
                <p className="text-[10px] font-bold tracking-[2em] text-gray-200 uppercase mb-10 ml-[2em]">結</p>
                <p className="font-black text-[#1a2a3a] text-4xl serif-font tracking-[0.3em] mb-6">道中ご無事で</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.6em] serif-font italic opacity-60">A Safe Journey to You</p>
                
                <div className="flex justify-center gap-10 mt-16 opacity-20">
                   <div className="w-[1px] h-10 bg-[#1a2a3a] rotate-12"></div>
                   <div className="w-[1px] h-10 bg-[#e60012] rotate-12"></div>
                   <div className="w-[1px] h-10 bg-[#c5a059] rotate-12"></div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Frame Decor - Clean and subtle */}
      <div className="fixed inset-8 border border-indigo-900/[0.02] pointer-events-none z-[-1]"></div>

      {/* Traditional Floating Refresh Button - Simplified for clean UI */}
      <button 
        onClick={loadData}
        disabled={loading}
        className="fixed bottom-12 right-12 w-14 h-14 bg-white border border-gray-100 text-[#1a2a3a] flex items-center justify-center shadow-sm hover:border-[#e60012] hover:text-[#e60012] transition-all z-50 group overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center">
           <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${loading ? 'animate-spin text-[#e60012]' : 'group-hover:text-[#e60012]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
           </svg>
           <span className="text-[8px] font-bold mt-1 serif-font opacity-0 group-hover:opacity-100 transition-opacity">更</span>
        </div>
      </button>
    </div>
  );
};

export default App;
