import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Stars, Coffee, MessageCircleHeart, Map, Gem, Crown } from 'lucide-react';
import { invitationData } from '../../data/invitations';

const getStoryIcon = (index) => {
  const icons = [
    <Stars size={16} className="text-accent" />,
    <Coffee size={16} className="text-accent" />,
    <MessageCircleHeart size={16} className="text-accent" />,
    <Map size={16} className="text-accent" />,
    <Gem size={16} className="text-accent" />,
    <Crown size={16} className="text-accent" />
  ];
  return icons[index] || <Heart size={16} className="text-accent" />;
};

export default function LoveStory() {
  const { loveStory } = invitationData;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);
  const cinematicEase = [0.16, 1, 0.3, 1];

  return (
    <section ref={sectionRef} className="relative w-full py-24 px-5 sm:px-6 bg-background overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-0 right-0 w-[200%] h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <motion.div 
        className="w-full max-w-3xl mx-auto flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: cinematicEase }}
      >
        <div className="text-center mb-16 sm:mb-20 flex flex-col items-center">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-text-secondary mb-4">
            Perjalanan Kami
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-5 italic">
            Our Love Story
          </h2>
          <div className="w-12 h-[1px] bg-accent/60 mx-auto" />
        </div>

        <div className="relative w-full">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-border-custom md:-translate-x-1/2" />
          
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent/20 via-accent to-accent/20 md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {loveStory.timeline.map((story, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index} 
                className={`relative mb-12 sm:mb-16 w-full pl-14 md:pl-0 md:w-1/2 ${
                  isEven ? 'md:pr-12 md:ml-0 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'
                }`}
                initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: cinematicEase, delay: 0.1 }}
              >
                <div className={`absolute left-6 md:left-auto ${
                  isEven ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'
                } top-0 w-8 h-8 -translate-x-1/2 flex items-center justify-center bg-background rounded-full border-4 border-surface shadow-[0_0_15px_rgba(183,157,123,0.3)] z-10`}>
                  {getStoryIcon(index)}
                </div>

                <div className="bg-surface/60 backdrop-blur-sm p-6 sm:p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-primary/5 hover:border-accent/30 transition-colors duration-500 text-left md:text-inherit">
                  <span className="font-heading text-xl sm:text-2xl italic font-light text-primary block mb-2 opacity-90">
                    {story.date}
                  </span>
                  <h3 className="font-body text-[11px] tracking-[0.2em] font-semibold text-accent uppercase mb-4">
                    {story.title}
                  </h3>
                  <p className="font-body text-[13px] font-light leading-[1.8] text-text-secondary text-left">
                    {story.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="mt-20 sm:mt-24 text-center px-4 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: cinematicEase }}
        >
          <Heart size={20} className="text-accent/40 mx-auto mb-6 sm:mb-8" strokeWidth={1} />
          <p className="font-heading text-lg sm:text-2xl italic font-light text-primary leading-relaxed opacity-90 drop-shadow-sm">
            {loveStory.quote}
          </p>
          <div className="w-8 h-[1px] bg-accent/40 mx-auto mt-6 sm:mt-8" />
        </motion.div>

      </motion.div>
    </section>
  );
}