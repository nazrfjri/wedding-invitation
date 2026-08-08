import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift as GiftIcon, Copy, CheckCircle2, CreditCard, Wallet } from 'lucide-react';
import { invitationData } from '../../data/invitations';

export default function Gift() {
  const { gift } = invitationData;
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const cinematicEase = [0.16, 1, 0.3, 1];

  return (
    <section className="w-full py-24 px-6 bg-secondary flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[150%] h-64 bg-gradient-to-b from-background to-transparent blur-2xl pointer-events-none -translate-y-1/2" />

      <motion.div 
        className="w-full max-w-xl flex flex-col items-center text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: cinematicEase }}
      >
        <div className="w-16 h-16 rounded-full bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-border-custom flex items-center justify-center mb-6">
          <GiftIcon size={24} className="text-accent" strokeWidth={1.5} />
        </div>
        
        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-text-secondary mb-3">
          Tanda Kasih
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-5 italic drop-shadow-sm">
          {gift.title}
        </h2>
        <div className="w-12 h-[1px] bg-accent/60 mx-auto mb-6" />
        
        <p className="font-body text-[13px] text-text-secondary leading-[1.8] font-light max-w-sm mb-12">
          {gift.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative overflow-hidden bg-surface text-primary px-10 py-4 rounded-full font-body text-[11px] font-medium tracking-[0.2em] uppercase shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-primary/10 transition-all duration-300 ${isOpen ? 'ring-2 ring-accent/30' : 'hover:border-accent/30'}`}
        >
          <div className="flex items-center gap-3">
            {isOpen ? <Wallet size={16} /> : <GiftIcon size={16} />}
            {isOpen ? "Tutup Amplop Digital" : "Buka Amplop Digital"}
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, scale: 0.95 }}
              animate={{ height: "auto", opacity: 1, scale: 1 }}
              exit={{ height: 0, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: cinematicEase }}
              className="w-full mt-10 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                {gift.banks.map((bank, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-surface/80 backdrop-blur-md p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-border-custom flex flex-col items-center relative group"
                  >
                    <div className="absolute -left-6 -top-6 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl group-hover:bg-accent/20 transition-colors duration-500" />
                    
                    <CreditCard size={20} className="text-accent/60 mb-4" strokeWidth={1} />
                    
                    <h3 className="font-heading text-xl text-primary font-bold mb-1 italic">
                      {bank.name}
                    </h3>
                    <p className="font-body text-base font-semibold tracking-widest text-text-primary mb-1">
                      {bank.accountNumber}
                    </p>
                    <p className="font-body text-[11px] text-text-secondary mb-6 tracking-wider uppercase font-light">
                      a.n. {bank.accountName}
                    </p>
                    
                    <button
                      onClick={() => handleCopy(bank.accountNumber, index)}
                      className="w-full flex items-center justify-center gap-2 bg-secondary text-primary px-4 py-3 rounded-xl font-body text-[10px] uppercase font-medium tracking-widest border border-border-custom transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                      {copiedIndex === index ? (
                        <><CheckCircle2 size={14} className="text-green-500" />Tersalin</>
                      ) : (
                        <><Copy size={14} />Salin Nomor</>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}