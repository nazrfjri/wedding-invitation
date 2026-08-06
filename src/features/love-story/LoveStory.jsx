import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { invitationData } from '../../data/invitations';

export default function LoveStory() {
  const { loveStory } = invitationData;

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full py-20 px-6 bg-background overflow-hidden">
      <motion.div 
        className="max-w-sm mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-12 flex flex-col items-center">
          <h2 className="font-heading text-4xl text-primary mb-3">Our Love Story</h2>
          <Heart size={16} className="text-accent fill-accent/20" />
        </div>

        <motion.div 
          className="relative w-full pl-4"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <div className="absolute top-2 bottom-0 left-[15px] w-[1px] bg-border-custom" />

          {loveStory.timeline.map((story, index) => (
            <motion.div key={index} variants={itemVariant} className="relative pl-8 mb-10 last:mb-0">
              <div className="absolute left-0 top-1.5 w-8 h-8 -translate-x-[15px] flex items-center justify-center bg-background">
                <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-surface" />
              </div>

              <div className="bg-surface p-5 rounded-2xl shadow-sm border border-border-custom relative">
                <div className="absolute top-3 -left-[6px] w-3 h-3 bg-surface border-l border-b border-border-custom rotate-45" />
                <span className="font-heading text-base font-semibold text-primary block mb-1">
                  {story.date}
                </span>
                <h3 className="font-body text-sm font-semibold text-text-primary mb-2">
                  {story.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-text-secondary text-justify">
                  {story.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Kutipan Penutup */}
        <motion.div 
          className="mt-16 text-center px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-heading text-lg italic text-primary leading-relaxed">
            {loveStory.quote}
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}