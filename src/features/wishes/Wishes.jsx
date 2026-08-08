// src/features/wishes/Wishes.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MessageSquareHeart, Clock, Loader2, Sparkles } from 'lucide-react';
import dayjs from '../../utils/date';

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  const messageValue = watch("message", "");
  const maxChars = 500;

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch('/api/wishes');
        if (response.ok) {
          const data = await response.json();
          setWishes(data);
        }
      } catch (error) {
        console.error("Gagal memuat ucapan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishes();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.name,
        message: data.message,
        createdAt: new Date().toISOString()
      };
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const savedWish = await response.json();
        setWishes([savedWish, ...wishes]);
        reset();
      }
    } catch (error) {
      console.error("Gagal mengirim ucapan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cinematicEase = [0.16, 1, 0.3, 1];

  return (
    <section className="w-full py-24 px-6 bg-secondary flex flex-col items-center overflow-hidden relative">
      {/* Background Ornament */}
      <div className="absolute bottom-0 left-0 w-[150%] h-64 bg-gradient-to-t from-background to-transparent blur-2xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <motion.div 
        className="w-full max-w-lg flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: cinematicEase }}
      >
        <div className="text-center mb-12 flex flex-col items-center">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-text-secondary mb-3">
            Sampaikan Doa
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-4 italic drop-shadow-sm">
            Wishes
          </h2>
          <div className="w-12 h-[1px] bg-accent/60 mx-auto mb-6" />
          <p className="font-body text-[12px] font-light text-text-secondary leading-relaxed max-w-xs mx-auto">
            Berikan ucapan terbaik dan doa restu untuk kedua mempelai
          </p>
        </div>

        {/* Card Utama (Satu Kolom Penuh) */}
        <div className="w-full bg-surface/80 backdrop-blur-md border border-border-custom rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          
          {/* Bagian Atas: Form Input */}
          <div className="w-full p-6 sm:p-8 border-b border-border-custom bg-background/30">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input 
                type="text" 
                placeholder="Nama Anda" 
                {...register("name", { required: "Nama wajib diisi" })}
                className={`w-full bg-surface border ${errors.name ? 'border-red-400' : 'border-border-custom focus:ring-accent/10 focus:border-accent/50'} p-4 rounded-2xl font-body text-[13px] text-text-primary focus:outline-none focus:ring-4 transition-all`}
              />
              
              <div className="relative">
                <textarea 
                  placeholder="Tulis ucapan dan doa..." 
                  rows="3"
                  maxLength={maxChars}
                  {...register("message", { required: "Ucapan wajib diisi" })}
                  className={`w-full bg-surface border ${errors.message ? 'border-red-400' : 'border-border-custom focus:ring-accent/10 focus:border-accent/50'} p-4 rounded-2xl font-body text-[13px] text-text-primary focus:outline-none focus:ring-4 transition-all resize-none`}
                ></textarea>
                <span className="absolute bottom-4 right-4 text-[9px] tracking-widest text-text-secondary font-body bg-surface/80 backdrop-blur px-2 py-1 rounded-full">
                  {messageValue.length}/{maxChars}
                </span>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white px-6 py-4 rounded-2xl font-body text-[11px] font-medium tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(90,46,46,0.1)] active:scale-[0.98] hover:shadow-[0_10px_20px_rgba(90,46,46,0.2)] disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Mengirim...</>
                ) : (
                  <><Sparkles size={14} /> Kirim Ucapan</>
                )}
              </button>
            </form>
          </div>

          {/* Bagian Bawah: List Ucapan */}
          <div className="w-full relative bg-secondary/20">
            <div className="py-5 px-6 sm:px-8 flex items-center justify-between border-b border-border-custom/50">
              <span className="font-heading text-xl italic text-primary">Daftar Ucapan</span>
              <span className="font-body text-[10px] tracking-widest uppercase font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                {isLoading ? "..." : `${wishes.length} Pesan`}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-5 h-[400px] overflow-y-auto relative scrollbar-hide">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 size={24} className="text-accent animate-spin" />
                </div>
              ) : wishes.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-text-secondary opacity-60">
                  <MessageSquareHeart size={32} className="mb-3 opacity-50" strokeWidth={1} />
                  <p className="text-xs font-body tracking-wider">Belum ada ucapan</p>
                </div>
              ) : (
                <AnimatePresence>
                  {wishes.map((wish) => (
                    <motion.div 
                      key={wish.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-background/50 border border-border-custom/50 p-5 rounded-2xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-heading text-lg font-bold text-primary italic">
                          {wish.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[9px] tracking-wider uppercase text-text-secondary font-body bg-surface px-2.5 py-1.5 rounded-md border border-border-custom">
                          <Clock size={10} />
                          <span>{dayjs(wish.createdAt).fromNow()}</span> 
                        </div>
                      </div>
                      <p className="font-body text-[13px] text-text-primary leading-[1.8] font-light">
                        {wish.message}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            {/* Fade Out Overlay di bawah list agar scroll terlihat elegan */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none rounded-b-[2.5rem]" />
          </div>

        </div>
      </motion.div>
    </section>
  );
}