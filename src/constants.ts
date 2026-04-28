export const AUDIO_TRACKS = [
  {
    id: 1,
    title: "DATA_CORRUPTION_01.WAV",
    artist: "SYS.GHOST",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "0x254"
  },
  {
    id: 2,
    title: "NULL_POINTER_EXCEPTION",
    artist: "MEM_DUMP",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "0x2A3"
  },
  {
    id: 3,
    title: "GLTCH_PULSE_SEQ",
    artist: "VOID_KERNEL",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "0x23C"
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = { x: 0, y: -1 };
export const GAME_SPEED_MS = 80; // Faster for a machine-like feel
