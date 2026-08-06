// src/features/hero/Hero.jsx
import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitations';

export default function Hero() {
  const { couple, event, greetings } = invitationData;

  // Varian animasi standar untuk efek berurutan (stagger)
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      
      {/* Ornamen Latar Belakang (Opsional: bisa disesuaikan dengan tema Javanese Elegant) */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-surface to-transparent opacity-50 pointer-events-none" />

      <motion.div 
        className="flex flex-col items-center text-center z-10 w-full max-w-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }} // Animasi jalan saat masuk viewport
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {/* Salam & Pembuka */}
        <motion.div variants={fadeUpVariant} className="mb-10">
          <h2 className="font-heading text-lg text-primary mb-4">
            {greetings.salam}
          </h2>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {greetings.opening}
          </p>
        </motion.div>

        {/* Foto Pasangan (Lingkaran) */}
        <motion.div 
          variants={fadeUpVariant} 
          className="relative mb-10 p-2 rounded-full border border-border-custom bg-surface shadow-xl"
        >
          <div className="w-56 h-56 rounded-full overflow-hidden relative bg-gray-100">
            {/* Ganti dengan foto asli berdua */}
            <img 
              src="/src/assets/images/couples/prewed3.webp" 
              alt="Putri & Zagar" 
              className="object-cover w-full h-full scale-105"
            />
            {/* Overlay lembut */}
            <div className="absolute inset-0 bg-primary/5 rounded-full mix-blend-multiply" />
          </div>
        </motion.div>

        {/* Nama & Tanggal */}
        <motion.div variants={fadeUpVariant}>
          <h1 className="font-heading text-4xl text-primary mb-3">
            {couple.bride.nickname} & {couple.groom.nickname}
          </h1>
          <div className="w-12 h-[1px] bg-accent mx-auto mb-4" />
          <p className="font-body text-sm tracking-[0.2em] text-text-secondary uppercase">
            {event.coverDate}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}