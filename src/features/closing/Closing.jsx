import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitations';
import closingImage from '../../assets/images/couples/prewed1.webp'; 

export default function Closing() {
  const { couple, closing } = invitationData;

  const cinematicEase = [0.16, 1, 0.3, 1];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.25, delayChildren: 0.3 } 
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: cinematicEase } }
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-black">      
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${closingImage})` }}
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.15 }}
        transition={{ duration: 25, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/80" />

      <motion.div 
        className="relative z-10 text-center flex flex-col items-center w-full max-w-lg"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.h2 
          variants={itemVariant} 
          className="font-heading text-5xl sm:text-7xl text-white/95 mb-8 italic font-light drop-shadow-2xl tracking-wide"
        >
          {closing.thankYou}
        </motion.h2>
        
        <motion.div variants={itemVariant} className="w-12 h-[1px] bg-white/40 mx-auto mb-10" />

        <motion.p 
          variants={itemVariant} 
          className="font-body text-[12px] sm:text-[14px] text-white/80 leading-[2.2] font-light mb-14 drop-shadow-md px-4 sm:px-10"
        >
          {closing.message}
        </motion.p>

        <motion.p 
          variants={itemVariant} 
          className="font-heading text-lg sm:text-2xl text-white/90 italic font-light mb-20 drop-shadow-md tracking-wide"
        >
          {closing.salam}
        </motion.p>

        <motion.h3 
          variants={itemVariant} 
          className="font-script-4 text-6xl sm:text-8xl text-white/95 drop-shadow-2xl flex flex-col items-center leading-none"
        >
          {couple.bride.nickname} 
          <motion.span 
            className="font-heading text-3xl sm:text-4xl italic font-light text-white/60 my-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1, ease: cinematicEase }}
          >
            &
          </motion.span>
          {couple.groom.nickname}
        </motion.h3>
      </motion.div>
    </section>
  );
}