import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CalendarPlus } from 'lucide-react'; 
import { invitationData } from '../../data/invitations';
import { useCountdown } from '../../hooks/useCountdown';
import floralOrnament from '../../assets/images/ornaments/floral-bottom.webp'; 

export default function Countdown() {
  const { event } = invitationData;
  const { days, hours, minutes, seconds, isExpired } = useCountdown(event.targetIsoDate);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotateOrnament = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const cinematicEase = [0.16, 1, 0.3, 1];
  
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: cinematicEase } }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-[85dvh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-secondary">      
      <motion.img 
        src={floralOrnament} 
        alt="Floral Ornament" 
        style={{ y: yParallax, rotate: rotateOrnament }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px] sm:max-w-md object-contain opacity-20 pointer-events-none z-0 mix-blend-multiply"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: cinematicEase }}
      />

      <motion.div 
        className="relative z-10 flex flex-col items-center w-full max-w-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariant}
      >
        <motion.div variants={itemVariant} className="text-center mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-5 italic font-light tracking-wide drop-shadow-sm">
            Save The Date
          </h2>
          <div className="w-12 h-[1px] bg-accent/60 mx-auto mb-6" />
          <p className="font-body text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-text-secondary font-medium">
            {event.fullDate}
          </p>
        </motion.div>

        {!isExpired ? (
          <motion.div variants={itemVariant} className="flex gap-3 sm:gap-5 justify-center w-full mb-14">
            {[
              { label: 'Hari', value: days },
              { label: 'Jam', value: hours },
              { label: 'Menit', value: minutes },
              { label: 'Detik', value: seconds }
            ].map((time, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-20 sm:w-20 sm:h-24 bg-surface/40 backdrop-blur-md rounded-[1.25rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center justify-center border border-primary/10 mb-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="font-heading text-3xl sm:text-4xl text-primary font-light">
                    {time.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="font-body text-[9px] text-text-secondary uppercase tracking-[0.25em] font-medium">
                  {time.label}
                </span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={itemVariant} className="px-8 py-5 bg-surface/60 backdrop-blur-sm rounded-2xl border border-primary/10 mb-14 shadow-sm">
            <p className="font-heading text-xl text-primary text-center italic font-light">
              Hari bahagia telah tiba
            </p>
          </motion.div>
        )}

        <motion.a
          href={event.calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariant}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden bg-primary text-white/95 px-8 py-4 rounded-full flex items-center gap-3 font-body text-[10px] font-medium tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(90,46,46,0.2)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(90,46,46,0.4)]"
        >
          <CalendarPlus size={15} className="opacity-80 group-hover:scale-110 transition-transform duration-300" />
          Simpan ke Kalender
        </motion.a>
        
      </motion.div>
    </section>
  );
}