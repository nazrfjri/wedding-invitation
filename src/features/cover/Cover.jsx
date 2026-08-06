import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../contexts/AudioContext';
import { invitationData } from '../../data/invitations';
import coverImage from '../../assets/images/couples/prewed-cover.webp';
// 1. Import useEffect dan useState
import { useEffect, useState } from 'react'; 

export default function Cover({ isOpened, onOpen }) {
  const { playAudio } = useAudio();
  const { couple, event } = invitationData;
  // 2. Buat state untuk nama tamu
  const [guestName, setGuestName] = useState("Tamu Undangan");

  // 3. Tangkap parameter '?to=' dari URL browser
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const to = queryParams.get("to");
    if (to) {
      setGuestName(to);
    }
  }, []);

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
          className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-16 max-w-md mx-auto w-full bg-cover bg-center text-text-light will-change-transform"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          <motion.div 
            className="relative z-10 text-center flex flex-col items-center w-full px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          >
            {/* --- Bagian Dynamic Guest Name --- */}
            <div className="mb-10 flex flex-col items-center border-b border-white/20 pb-4 px-8">
              <p className="font-body text-xs text-white/80 mb-2 tracking-widest uppercase">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h2 className="font-heading text-2xl text-white font-bold tracking-wide capitalize">
                {guestName}
              </h2>
            </div>
            {/* --------------------------------- */}

            <p className="text-xs tracking-[0.2em] uppercase mb-4 font-body opacity-90">
              The Wedding Of
            </p>
            
            {/* Menggunakan font-script (Great Vibes) */}
            <h1 className="text-7xl sm:text-8xl font-script mb-6 tracking-normal drop-shadow-lg leading-tight">
              {couple.bride.nickname} 
              <br /> 
              <span className="text-5xl font-script">&</span> 
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