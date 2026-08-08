// src/features/hero/Hero.jsx
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { invitationData } from '../../data/invitations';
import profileImage from '../../assets/images/couples/prewed3.webp';

export default function Hero() {
  const { couple, event, greetings } = invitationData;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cinematicEase = [0.16, 1, 0.3, 1];
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: cinematicEase } }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-background">
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] max-w-lg h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10"
      />

      <motion.div 
        className="flex flex-col items-center text-center z-10 w-full max-w-sm will-change-transform"
        style={{ y: yText, opacity: opacityFade }}
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.div variants={itemVariant} className="mb-14">
          <h2 className="font-heading italic text-xl sm:text-2xl text-primary mb-6 font-light tracking-wide opacity-90">
            {greetings.salam}
          </h2>
          <p className="font-body text-[13px] font-light text-text-secondary leading-[2.2] max-w-[280px] mx-auto opacity-80">
            {greetings.opening}
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariant} 
          className="relative mb-16 p-[2px] rounded-[2rem] bg-gradient-to-b from-primary/20 to-transparent"
          style={{ perspective: 1000 }} 
        >
          {/* Ubah bentuk dari lingkaran kaku (rounded-full) ke squircle/rounded-[2rem] ala desain iOS modern */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-64 h-[22rem] rounded-[2rem] overflow-hidden relative bg-surface cursor-pointer group shadow-2xl"
          >
            <motion.img 
              src={profileImage} 
              alt="Pasangan"
              className="object-cover w-full h-full"
              style={{ translateZ: "20px" }} 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: cinematicEase }}
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariant} className="relative flex flex-col items-center">
          <h1 className="font-script-4 text-5xl sm:text-6xl text-primary mb-6 leading-tight">
            {couple.bride.nickname} 
            <span className="block text-2xl font-heading italic text-accent font-light my-2">dan</span> 
            {couple.groom.nickname}
          </h1>
          
          <p className="font-body text-[10px] font-medium tracking-[0.4em] text-text-secondary uppercase">
            {event.coverDate}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}