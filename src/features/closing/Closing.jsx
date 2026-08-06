import { motion } from 'framer-motion';
import { invitationData } from '../../data/invitations';
import closingImage from '../../assets/images/couples/prewed1.webp'; 

export default function Closing() {
  const { couple, closing } = invitationData;

  return (
    <section 
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center py-20 px-6 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${closingImage})` }}
    >
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/60" />

      <motion.div 
        className="relative z-10 text-center flex flex-col items-center w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="font-heading text-6xl text-white mb-8 italic drop-shadow-md">
          {closing.thankYou}
        </h2>
        
        <p className="font-body text-sm text-white/90 leading-relaxed mb-10 drop-shadow-sm px-4">
          {closing.message}
        </p>

        <p className="font-body text-sm text-white font-medium mb-16 drop-shadow-sm">
          {closing.salam}
        </p>

        <h3 className="font-heading text-3xl text-white tracking-wider drop-shadow-md">
          {couple.bride.nickname} & {couple.groom.nickname}
        </h3>
      </motion.div>
    </section>
  );
}