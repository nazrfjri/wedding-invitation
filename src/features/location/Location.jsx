import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { invitationData } from '../../data/invitations';

export default function Location() {
  const { event } = invitationData;

  // Ganti URL ini dengan link Google Maps yang sebenarnya
  const mapsLink = "https://maps.google.com/?q=Kp.+Kopo+Barat+RT.007/+RW.03+Muktijaya+Cilamaya+Kulon";

  return (
    <section className="w-full py-20 px-6 bg-background flex flex-col items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-sm flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-heading text-4xl text-primary mb-2 italic text-center">
          Lokasi Acara
        </h2>
        
        <p className="font-body text-sm text-text-primary font-medium text-center mt-6">
          {event.location}
        </p>
        <p className="font-body text-sm text-text-secondary text-center mb-8">
          {event.address}
        </p>

        {/* Kontainer Peta (Iframe Google Maps) */}
        <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-card border border-border-custom mb-8 bg-secondary relative">
          {/* 
            Ganti src di bawah ini dengan link EMBED dari Google Maps 
            Cara: Buka Google Maps -> Cari Lokasi -> Share -> Embed a map -> Copy HTML
          */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352.48524481163525!2d107.52110358455435!3d-6.207223843123401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69645e4c0ee0cb%3A0x34e86f7f5dad1575!2sJl.%20Muktijaya%2C%20Muktijaya%2C%20Kec.%20Cilamaya%20Kulon%2C%20Karawang%2C%20Jawa%20Barat!5e1!3m2!1sid!2sid!4v1786163823980!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Pernikahan"
            className="absolute inset-0 grayscale-[20%] contrast-[90%]" // Sedikit filter estetika
          ></iframe>
        </div>

        {/* Tombol Buka Maps */}
        <a 
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-body text-sm tracking-wide shadow-button transition-transform active:scale-[0.98]"
        >
          <MapPin size={18} />
          Buka di Google Maps
        </a>
      </motion.div>
    </section>
  );
}