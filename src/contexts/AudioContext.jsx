import { createContext, useState, useRef, useEffect, useContext } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Pastikan path ini sesuai dengan file Anda di src/assets/audio/
    audioRef.current = new Audio('/src/assets/audio/bgm.mp3'); 
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio error:", err));
    }
  };

  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio error:", err));
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);