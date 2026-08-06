import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';
import { useAudio } from '../../contexts/AudioContext';

export default function AudioPlayer() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggleAudio}
      className="fixed top-6 left-6 z-40 w-10 h-10 bg-surface/70 backdrop-blur-md rounded-full shadow-button flex items-center justify-center text-primary border border-border-custom"
      aria-label="Toggle Music"
    >
      {isPlaying ? <Pause size={16} /> : <Music size={16} />}
    </motion.button>
  );
}