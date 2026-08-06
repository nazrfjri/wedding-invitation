import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../contexts/AudioContext';
import { invitationData } from '../../data/invitations';
// 1. Import gambar secara eksplisit agar dikenali oleh Vite bundler
import coverImage from '../../assets/images/couples/prewed-cover.webp'; // Ubah ke .webp/.jpg di lokal Anda

export default function Cover({ isOpened, onOpen }) {
  const { playAudio } = useAudio();
  const { couple, event } = invitationData;

  const handleOpen = () => {
    playAudio();
    onOpen();
  };

  const cinematicEase = [0.83, 0, 0.17, 1];

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.section
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1.4, ease: cinematicEase }}
          // 2. Hapus bg-[url(...)] dari sini
          className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-16 max-w-md mx-auto w-full bg-cover bg-center text-text-light will-change-transform"
          // 3. Terapkan gambar melalui inline style
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          {/* Sisa kode di bawah ini tetap sama seperti milik Anda */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          <motion.div 
            className="relative z-10 text-center flex flex-col items-center w-full px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-4 font-body opacity-90">
              The Wedding Of
            </p>
            
            <h1 className="text-6xl font-script mb-6 tracking-tight drop-shadow-lg">
              {couple.bride.nickname} 
              <br /> 
              <span className="text-4xl italic font-light">&</span> 
              <br />
              {couple.groom.nickname}
            </h1>
            
            <p className="text-sm tracking-[0.15em] font-body mb-12 opacity-90 drop-shadow-md">
              {event.coverDate}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpen}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-full flex items-center gap-3 font-body text-sm tracking-wide shadow-button transition-all hover:bg-white/20 hover:border-white/50"
            >
              Buka Undangan
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="block text-xs"
                >
                  ↓
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}