import { motion } from 'framer-motion';
import { CalendarHeart, GlassWater, MapPin } from 'lucide-react';
import { invitationData } from '../../data/invitations';

export default function EventDetail() {
  const { event } = invitationData;

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full py-20 px-6 bg-secondary flex flex-col items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariant}
      >
        <motion.div variants={itemVariant} className="text-center mb-10">
          <h2 className="font-heading text-4xl text-primary mb-2 italic">
            Detail Acara
          </h2>
        </motion.div>

        {/* Card Akad Nikah */}
        <motion.div variants={itemVariant} className="bg-surface p-6 rounded-2xl shadow-sm border border-border-custom mb-4 flex gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <CalendarHeart className="text-accent" size={24} />
          </div>
          <div>
            <h3 className="font-heading text-xl text-primary mb-1">Akad Nikah</h3>
            <p className="font-body text-sm text-text-primary font-medium">
              {event.day}, {event.fullDate}
            </p>
            <p className="font-body text-sm text-text-secondary">
              Pukul {event.akadTime}
            </p>
          </div>
        </motion.div>

        {/* Card Resepsi */}
        <motion.div variants={itemVariant} className="bg-surface p-6 rounded-2xl shadow-sm border border-border-custom mb-4 flex gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <GlassWater className="text-accent" size={24} />
          </div>
          <div>
            <h3 className="font-heading text-xl text-primary mb-1">Resepsi</h3>
            <p className="font-body text-sm text-text-primary font-medium">
              {event.day}, {event.fullDate}
            </p>
            <p className="font-body text-sm text-text-secondary">
              Pukul {event.resepsiTime}
            </p>
          </div>
        </motion.div>

        {/* Card Lokasi Summary */}
        <motion.div variants={itemVariant} className="bg-surface p-6 rounded-2xl shadow-sm border border-border-custom flex gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <MapPin className="text-accent" size={24} />
          </div>
          <div>
            <h3 className="font-heading text-xl text-primary mb-1">Lokasi</h3>
            <p className="font-body text-sm text-text-primary font-medium mb-1">
              {event.location}
            </p>
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              {event.address}
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}