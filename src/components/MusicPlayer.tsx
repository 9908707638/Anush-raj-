import React, { useState, useRef, useEffect } from 'react';
import { AUDIO_TRACKS } from '../constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = AUDIO_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("AUDIO_EXECUTION_ERR", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => { setCurrentTrackIndex((p) => (p + 1) % AUDIO_TRACKS.length); setIsPlaying(true); };
  const handlePrev = () => { setCurrentTrackIndex((p) => (p - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length); setIsPlaying(true); };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration > 0) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <div className="jarring-border w-full flex flex-col p-6 screen-tear uppercase text-2xl relative bg-black">
      {/* Glitch block overlay */}
      <div className="absolute top-2 right-2 w-10 h-10 bg-glitch-cyan mix-blend-difference animate-ping opacity-70 pointer-events-none"></div>

      <div className="mb-6 z-10 relative">
        <div className="mb-2 w-max bg-glitch-cyan text-black px-2 py-1 font-bold text-lg">AUDIO_STREAM_INITIALIZED</div>
        <h2 className="font-pixel text-white text-base md:text-lg leading-loose break-words mb-4 glitch-text" data-text={currentTrack.title}>
          {currentTrack.title}
        </h2>
        <p className="text-glitch-magenta font-bold bg-dark-panel p-2 border border-glitch-magenta inline-block">AUTH: {currentTrack.artist}</p>
      </div>

      {/* Glitchy progress bar */}
      <div className="w-full bg-dark-bg border-2 border-glitch-cyan h-8 mb-4 relative overflow-hidden">
         <div 
           className="h-full bg-glitch-cyan" 
           style={{ width: `${progress}%` }}
         >
            {/* Stripe effect inside progress bar */}
            <div className="w-full h-full opacity-40 mix-blend-multiply" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' }}></div>
         </div>
      </div>
      
      <div className="flex justify-between items-center mb-8 font-bold">
        <span className="text-glitch-cyan">{Math.floor(progress)}%_DUMPED</span>
        <span className="text-glitch-magenta">SIZE: {currentTrack.duration}</span>
      </div>

      <div className="flex w-full border-4 border-glitch-magenta bg-black font-pixel text-sm md:text-base">
        <button 
          onClick={handlePrev}
          className="flex-1 py-5 border-r-4 border-glitch-magenta text-white hover:bg-glitch-magenta hover:text-black transition-colors"
        >
          &lt;_PRV
        </button>
        <button 
          onClick={handlePlayPause}
          className="flex-1 py-5 border-r-4 border-glitch-magenta text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-colors glitch-text"
          data-text={isPlaying ? "PAUSE_X" : "EXECUTE"}
        >
          {isPlaying ? "PAUSE_X" : "EXECUTE"}
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 py-5 text-white hover:bg-glitch-magenta hover:text-black transition-colors"
        >
          NXT_&gt;
        </button>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
}
