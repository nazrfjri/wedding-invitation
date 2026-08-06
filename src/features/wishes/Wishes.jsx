// src/features/wishes/Wishes.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MessageSquareHeart, UserCircle2, Clock, Loader2 } from 'lucide-react';
import dayjs from '../../utils/date';

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  const messageValue = watch("message", "");
  const maxChars = 500;

  // Fetch data dari Vercel KV saat komponen dimuat
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

  // Mengirim data ke Vercel KV
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
        // Update UI langsung dengan data baru di posisi teratas
        setWishes([savedWish, ...wishes]);
        reset();
      }
    } catch (error) {
      console.error("Gagal mengirim ucapan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 px-6 bg-background flex flex-col items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-md flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="font-heading text-4xl text-primary mb-3 italic">
            Ucapan & Doa
          </h2>
          <MessageSquareHeart size={20} className="text-accent mb-2" />
          <p className="font-body text-sm text-text-secondary">
            Berikan ucapan terbaik untuk kedua mempelai
          </p>
        </div>

        <div className="w-full bg-surface border border-border-custom rounded-2xl shadow-sm overflow-hidden">
          
          <div className="bg-secondary/50 border-b border-border-custom py-3 px-4 flex items-center justify-center gap-2">
            <MessageSquareHeart size={16} className="text-primary" />
            <span className="font-heading text-sm text-primary font-bold tracking-wide">
              {isLoading ? "Memuat..." : `${wishes.length} Ucapan`}
            </span>
          </div>

          <div className="p-6 border-b border-border-custom bg-background/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Nama Anda" 
                  {...register("name", { required: "Nama wajib diisi" })}
                  className={`w-full bg-surface border ${errors.name ? 'border-red-400' : 'border-border-custom'} p-3.5 rounded-xl font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors`}
                />
              </div>
              
              <div className="relative">
                <textarea 
                  placeholder="Berikan Ucapan & Doa" 
                  rows="4"
                  maxLength={maxChars}
                  {...register("message", { required: "Ucapan wajib diisi" })}
                  className={`w-full bg-surface border ${errors.message ? 'border-red-400' : 'border-border-custom'} p-3.5 rounded-xl font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors resize-none`}
                ></textarea>
                <span className="absolute bottom-3 right-3 text-[10px] text-text-secondary font-body">
                  {messageValue.length}/{maxChars}
                </span>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-body text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Mengirim...</>
                ) : "Kirim"}
              </button>
            </form>
          </div>

          <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={24} className="text-accent animate-spin" />
              </div>
            ) : wishes.length === 0 ? (
              <p className="text-center text-sm text-text-secondary font-body py-8">
                Belum ada ucapan. Jadilah yang pertama!
              </p>
            ) : (
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div 
                    key={wish.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="shrink-0 mt-1">
                      <UserCircle2 size={36} className="text-border-custom" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading text-sm font-bold text-primary mb-0.5">
                        {wish.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-text-secondary mb-2 font-body">
                        <Clock size={10} />
                        <span>{dayjs(wish.createdAt).fromNow()}</span> 
                      </div>
                      <p className="font-body text-xs text-text-primary leading-relaxed">
                        {wish.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}