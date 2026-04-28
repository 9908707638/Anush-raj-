import React, { useEffect, useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-dark-bg text-white relative font-raw flex flex-col p-4 md:p-8 overflow-hidden uppercase">
      {/* Static noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ 
          opacity: 0.04,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }}
      />
      
      <header className="mb-8 border-b-4 border-glitch-magenta pb-4 flex flex-col md:flex-row justify-between items-start md:items-end z-10 screen-tear relative">
        <div>
          <h1 
            className="font-pixel text-2xl md:text-4xl text-white glitch-text tracking-widest" 
            data-text="OP_TERM::SNAKE_PROTOCOL"
          >
            OP_TERM::SNAKE_PROTOCOL
          </h1>
          <p className="text-glitch-cyan mt-3 text-xl md:text-2xl font-bold tracking-widest">
            [ USER_ID: ANONYMOUS ] [ STATUS: FRAGMENTING ]
          </p>
        </div>
        <div className="font-pixel text-sm md:text-lg text-glitch-magenta animate-pulse mt-4 md:mt-0 p-2 bg-black border-2 border-glitch-magenta">
          STREAMING_SYS_DATA
        </div>
      </header>

      <main className="flex-1 flex flex-col xl:flex-row gap-12 z-10 w-full max-w-7xl mx-auto items-stretch">
        <div className="flex-1 flex justify-center items-center w-full min-h-[500px]">
          <SnakeGame />
        </div>

        <div className="w-full xl:w-[450px] flex flex-col gap-8 shrink-0">
          <div className="jarring-border-alt p-5 text-2xl">
            <p className="text-glitch-cyan mb-2">&gt; EXE SECTOR DISK_0</p>
            <p className="mb-2">&gt; MOUNT AUDIO_SYS_</p>
            <p className="text-glitch-magenta animate-pulse mb-2 font-bold">&gt; WARNING: SYNCHRONIZATION ERROR DETECTED</p>
            <div className="h-6 w-full bg-glitch-magenta/20 mt-4 overflow-hidden flex border border-glitch-magenta">
              <div className="w-2/3 h-full bg-glitch-magenta animate-pulse"></div>
            </div>
          </div>
          
          <MusicPlayer />
        </div>
      </main>
    </div>
  );
}
