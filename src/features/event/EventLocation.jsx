// src/features/event/EventLocation.jsx
import { motion } from 'framer-motion';
import { MapPin, CalendarHeart, GlassWater, Navigation } from 'lucide-react';
import { invitationData } from '../../data/invitations';

// Anda bisa menggunakan foto prewed lain atau latar belakang netral sebagai aksen
import eventBg from '../../assets/images/gallery/prewed4.webp'; 

export default function EventLocation() {
  const { event } = invitationData;

  const cinematicEase = [0.16, 1, 0.3, 1];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: cinematicEase } }
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 bg-background flex flex-col items-center overflow-hidden">
      
      {/* Background Ornament Lembut */}
      <div className="absolute -left-1/4 top-1/4 w-[150%] h-[600px] bg-gradient-to-tr from-accent/5 via-primary/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <motion.div 
        className="w-full max-w-3xl flex flex-col items-center z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariant}
      >
        <motion.div variants={cardVariant} className="text-center mb-14">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-text-secondary mb-4">
            Rangkaian Acara
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-5 italic">
            Event & Location
          </h2>
          <div className="w-12 h-[1px] bg-accent/60 mx-auto" />
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Card Akad Nikah */}
          <motion.div 
            variants={cardVariant} 
            className="group relative overflow-hidden bg-surface/60 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-primary/5 hover:border-accent/30 transition-all duration-500"
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-background flex items-center justify-center mb-6 shadow-sm border border-border-custom">
              <CalendarHeart className="text-accent" size={26} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-2xl text-primary mb-2 italic">Akad Nikah</h3>
            <div className="space-y-1">
              <p className="font-body text-[13px] text-text-primary font-medium tracking-wide">
                {event.day}, {event.fullDate}
              </p>
              <p className="font-body text-[12px] text-text-secondary font-light">
                Pukul {event.akadTime}
              </p>
            </div>
          </motion.div>

          {/* Card Resepsi */}
          <motion.div 
            variants={cardVariant} 
            className="group relative overflow-hidden bg-surface/60 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-primary/5 hover:border-accent/30 transition-all duration-500"
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-background flex items-center justify-center mb-6 shadow-sm border border-border-custom">
              <GlassWater className="text-accent" size={26} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-2xl text-primary mb-2 italic">Resepsi</h3>
            <div className="space-y-1">
              <p className="font-body text-[13px] text-text-primary font-medium tracking-wide">
                {event.day}, {event.fullDate}
              </p>
              <p className="font-body text-[12px] text-text-secondary font-light">
                Pukul {event.resepsiTime}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bagian Peta & Detail Lokasi */}
        <motion.div 
          variants={cardVariant} 
          className="w-full bg-surface rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border-custom overflow-hidden relative"
        >
          {/* Iframe Peta (Di atas) */}
          <div className="w-full h-64 sm:h-80 relative bg-secondary">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352.48524481163525!2d107.52110358455435!3d-6.207223843123401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69645e4c0ee0cb%3A0x34e86f7f5dad1575!2sJl.%20Muktijaya%2C%20Muktijaya%2C%20Kec.%20Cilamaya%20Kulon%2C%20Karawang%2C%20Jawa%20Barat!5e1!3m2!1sid!2sid!4v1786163823980!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Pernikahan"
              className="absolute inset-0 grayscale-[30%] contrast-[95%] mix-blend-multiply opacity-80" 
            ></iframe>
            {/* Overlay Gradient agar transisi dari peta ke konten halus */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
          </div>

          {/* Info Lokasi & Tombol (Di bawah) */}
          <div className="p-8 sm:p-10 flex flex-col items-center text-center relative z-10 -mt-8">
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm border border-border-custom relative -mt-12">
              <MapPin className="text-primary" size={24} strokeWidth={1.5} />
            </div>
            
            <p className="font-body text-[13px] text-text-primary font-semibold tracking-wide mb-2 uppercase">
              {event.location}
            </p>
            <p className="font-body text-[13px] text-text-secondary leading-relaxed mb-8 max-w-md font-light">
              {event.address}
            </p>

            <a 
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-primary text-white/95 px-8 py-4 rounded-full flex items-center justify-center gap-3 font-body text-[10px] font-medium tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(90,46,46,0.2)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(90,46,46,0.4)] hover:bg-primary/90 w-full sm:w-auto"
            >
              <Navigation size={16} className="opacity-80 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              Buka Google Maps
            </a>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}