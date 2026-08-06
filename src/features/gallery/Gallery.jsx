import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Wajib di-import
import { invitationData } from '../../data/invitations';

export default function Gallery() {
  const { gallery } = invitationData;
  
  // State untuk mengontrol Lightbox
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <section className="w-full py-20 px-6 bg-secondary overflow-hidden">
      <motion.div 
        className="max-w-sm mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h2 className="font-heading text-4xl text-primary mb-3">
            Our Gallery
          </h2>
          <Heart size={16} className="text-accent fill-accent/20" />
        </div>

        {/* Grid Foto */}
        <motion.div 
          className="grid grid-cols-2 gap-3 mb-10 w-full"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {gallery.map((image, index) => (
            <motion.div 
              key={index} 
              variants={itemVariant}
              className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm cursor-pointer border border-border-custom bg-surface group"
              onClick={() => openLightbox(index)}
            >
              {/* Gambar sementara akan menggunakan background abu-abu jika file belum ada */}
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-gray-200"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Tombol Lihat Semua (Opsional: Membuka Lightbox dari awal) */}
        <button 
          onClick={() => openLightbox(0)}
          className="w-full border border-border-custom bg-surface text-primary py-3.5 rounded-full font-body text-sm tracking-wide shadow-sm transition-colors hover:bg-border-custom/30 active:scale-[0.98]"
        >
          Lihat Semua
        </button>

      </motion.div>

      {/* Komponen Lightbox (Swipe layar penuh) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={gallery}
        carousel={{ finite: false }} // Mengizinkan swipe berulang
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
      />
    </section>
  );
}