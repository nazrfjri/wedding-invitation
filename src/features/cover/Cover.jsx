import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../contexts/AudioContext';
import { invitationData } from '../../data/invitations';
import coverImage from '../../assets/images/couples/prewed-cover.webp';
import { useEffect, useState } from 'react'; 

export default function Cover({ isOpened, onOpen }) {
  const { playAudio } = useAudio();
  const { couple, event } = invitationData;
  const [guestName, setGuestName] = useState("Tamu Undangan");

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

  const premiumEase = [0.16, 1, 0.3, 1];
  const exitEase = [0.83, 0, 0.17, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: premiumEase } }
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.section
          exit={{ opacity: 0, y: '-100%', filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: exitEase }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 sm:pb-16 max-w-md mx-auto w-full text-text-light overflow-hidden bg-black"
        >
          <motion.div 
            className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${coverImage})` }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ scale: { duration: 12, ease: "easeOut" }, opacity: { duration: 1.5 } }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

          <motion.div 
            className="relative z-10 text-center flex flex-col items-center w-full px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-12 flex flex-col items-center w-full">
              <p className="font-body text-[9px] sm:text-[10px] font-light text-white/60 mb-3 tracking-[0.4em] uppercase">
                Kepada Yth.
              </p>
              <h2 className="font-heading text-lg sm:text-xl text-white/90 font-medium tracking-widest capitalize">
                {guestName}
              </h2>
              <div className="w-10 h-[1px] bg-white/30 mt-5" />
            </motion.div>

            <motion.p variants={itemVariants} className="text-[10px] font-light tracking-[0.3em] uppercase mb-6 font-body text-white/70">
              The Wedding Of
            </motion.p>
            
            <motion.h1 variants={itemVariants} className="text-7xl sm:text-8xl font-script-4 mb-2 tracking-normal drop-shadow-2xl leading-none">
              {couple.bride.nickname} 
              <br /> 
              <motion.span 
                className="inline-block text-4xl sm:text-5xl font-heading italic text-white/80 my-4 font-light"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1, ease: premiumEase }}
              >
                &
              </motion.span> 
              <br />
              {couple.groom.nickname}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-[11px] font-light tracking-[0.4em] font-body mt-8 mb-14 text-white/80 uppercase">
              {event.coverDate}
            </motion.p>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 text-white/90 px-8 py-4 rounded-full flex items-center gap-4 font-body text-[11px] font-medium tracking-[0.2em] uppercase shadow-2xl transition-all duration-300"
            >
              Buka Undangan
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="block text-[10px] opacity-70"
              >
                ▼
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}