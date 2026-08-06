import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitations';
import { useCountdown } from '../../hooks/useCountdown';

// Opsional: Jika ada ornamen bunga untuk bagian bawah layar
import floralOrnament from '../../assets/images/ornaments/floral-bottom.webp'; 

export default function Countdown() {
  const { event } = invitationData;
  const { days, hours, minutes, seconds, isExpired } = useCountdown(event.targetIsoDate);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full min-h-[80dvh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-secondary">
      <motion.div 
        className="z-10 flex flex-col items-center w-full max-w-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariant}
      >
        {/* Header Save The Date */}
        <motion.h2 variants={itemVariant} className="font-heading text-4xl text-primary mb-4 italic">
          Save The Date
        </motion.h2>
        
        <motion.p variants={itemVariant} className="font-body text-sm tracking-[0.15em] uppercase text-text-secondary mb-12">
          {event.fullDate}
        </motion.p>

        {/* Kotak Countdown */}
        {!isExpired ? (
          <motion.div variants={itemVariant} className="flex gap-4 sm:gap-6 justify-center w-full">
            {[
              { label: 'Hari', value: days },
              { label: 'Jam', value: hours },
              { label: 'Menit', value: minutes },
              { label: 'Detik', value: seconds }
            ].map((time, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-16 sm:w-16 sm:h-20 bg-surface rounded-xl shadow-card flex items-center justify-center border border-border-custom mb-3">
                  <span className="font-heading text-2xl sm:text-3xl text-primary">
                    {time.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="font-body text-xs text-text-secondary uppercase tracking-wider">
                  {time.label}
                </span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={itemVariant} className="px-6 py-4 bg-surface rounded-xl shadow-card border border-border-custom">
            <p className="font-heading text-xl text-primary text-center italic">
              Hari bahagia telah tiba
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Ornamen Bawah (Opsional, sesuai Mockup) */}
      <motion.img 
        src={floralOrnament} 
        alt="Floral Ornament" 
        className="absolute bottom-0 left-0 w-full object-cover opacity-80"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </section>
  );
}