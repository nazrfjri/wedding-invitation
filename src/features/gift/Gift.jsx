import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift as GiftIcon, Copy, CheckCircle2 } from 'lucide-react';
import { invitationData } from '../../data/invitations';

export default function Gift() {
  const { gift } = invitationData;
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset icon setelah 2 detik
  };

  return (
    <section className="w-full py-20 px-6 bg-secondary flex flex-col items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-sm flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GiftIcon size={32} className="text-accent mb-4" />
        <h2 className="font-heading text-4xl text-primary mb-4 italic">
          {gift.title}
        </h2>
        <p className="font-body text-sm text-text-secondary leading-relaxed mb-8">
          {gift.description}
        </p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-surface border border-border-custom text-primary px-8 py-3.5 rounded-full font-body text-sm tracking-wide shadow-sm transition-colors hover:bg-border-custom/30 active:scale-[0.98]"
        >
          {isOpen ? "Tutup Amplop Digital" : "Buka Amplop Digital"}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full overflow-hidden mt-6"
            >
              <div className="flex flex-col gap-4">
                {gift.banks.map((bank, index) => (
                  <div key={index} className="bg-surface p-6 rounded-2xl shadow-sm border border-border-custom flex flex-col items-center">
                    <h3 className="font-heading text-xl text-primary font-bold mb-2">
                      {bank.name}
                    </h3>
                    <p className="font-body text-lg tracking-widest text-text-primary mb-1">
                      {bank.accountNumber}
                    </p>
                    <p className="font-body text-sm text-text-secondary mb-4 uppercase">
                      a.n. {bank.accountName}
                    </p>
                    <button
                    onClick={() => handleCopy(bank.accountNumber, index)}
                    className="flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-lg font-body text-xs tracking-wide border border-border-custom transition-colors hover:bg-border-custom/50"
                    >
                    {copiedIndex === index ? (
                        <>
                        <CheckCircle2 size={14} className="text-green-600" />
                        Tersalin
                        </>
                    ) : (
                        <>
                        <Copy size={14} />
                        Salin Nomor
                        </>
                    )}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}