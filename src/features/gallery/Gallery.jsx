import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Maximize2 } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { invitationData } from '../../data/invitations';

export default function Gallery() {
  const { gallery } = invitationData;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const openLightbox = (index) => {
    setCurrentIndex(index % gallery.length);
    setOpen(true);
  };

  const infiniteGallery = [...gallery, ...gallery, ...gallery];

  return (
    <section ref={sectionRef} className="w-full py-24 sm:py-32 bg-secondary overflow-hidden relative flex flex-col items-center">      
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); } 
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 35s linear infinite;
          }
          /* Berhenti saat disorot mouse (PC) atau ditahan sentuhannya (HP) */
          .animate-infinite-scroll:hover,
          .animate-infinite-scroll:active {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="absolute top-1/2 left-0 w-full h-[80%] bg-gradient-to-b from-primary/5 via-accent/5 to-transparent blur-3xl pointer-events-none -translate-y-1/2" />

      <motion.div 
        className="text-center mb-16 sm:mb-20 flex flex-col items-center z-10 w-full px-6"
        style={{ y: yParallax }}
      >
        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-text-secondary mb-4">
          Momen Bahagia
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-5 italic drop-shadow-sm">
          Our Gallery
        </h2>
        <div className="w-12 h-[1px] bg-accent/60 mx-auto" />
      </motion.div>

      <div 
        className="w-full relative z-10" 
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex gap-4 sm:gap-6 w-max animate-infinite-scroll px-4">
          
          {infiniteGallery.map((image, index) => {
            const isEven = index % 2 === 0;
            const marginTop = isEven ? 'mt-0' : 'mt-12 sm:mt-24';
            
            return (
              <div 
                key={index} 
                className={`relative shrink-0 w-56 sm:w-80 rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] cursor-pointer border border-primary/5 bg-surface group ${marginTop}`}
                style={{ aspectRatio: isEven ? '3/4' : '4/5' }}
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none bg-gray-100"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/0 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <Maximize2 size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <motion.div 
        className="mt-16 sm:mt-20 flex flex-col items-center gap-2 opacity-60 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <span className="font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium">
          Sorot atau tahan gambar untuk memperbesar
        </span>
      </motion.div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={gallery}
        carousel={{ finite: false }} 
        styles={{ container: { backgroundColor: "rgba(15, 12, 10, 0.95)" } }}
      />
    </section>
  );
}