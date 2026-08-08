import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Heart, Loader2, Users, Send } from 'lucide-react';

export default function Rsvp() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const attendanceStatus = watch("attendance", "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stats, setStats] = useState({ totalHadir: 0, totalTidakHadir: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/rsvp');
      if (res.ok) {
        const data = await res.json();
        setStats({ totalHadir: data.totalHadir, totalTidakHadir: data.totalTidakHadir });
      }
    } catch (error) {
      console.error("Gagal memuat statistik RSVP");
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
        fetchStats();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Gagal mengirim RSVP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cinematicEase = [0.16, 1, 0.3, 1];

  return (
    <section className="w-full py-24 px-6 bg-background flex flex-col items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: cinematicEase }}
      >
        <div className="text-center mb-12 flex flex-col items-center">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-text-secondary mb-3">
            Konfirmasi
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-4 italic drop-shadow-sm">
            RSVP
          </h2>
          <div className="w-12 h-[1px] bg-accent/60 mx-auto mb-6" />
          <p className="font-body text-[12px] font-light text-text-secondary leading-relaxed">
            Mohon konfirmasi kehadiran Anda<br/>sebelum 14 Agustus 2026
          </p>
        </div>

        <div className="bg-surface/50 backdrop-blur-sm border border-border-custom p-5 rounded-[2rem] mb-10 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center border border-border-custom">
              <Users size={20} className="text-accent" strokeWidth={1.5} />
            </div>
            <span className="font-body text-[11px] tracking-widest uppercase font-medium text-text-secondary">Tamu Hadir</span>
          </div>
          <div className="font-heading text-3xl font-light text-primary">
            {isLoadingStats ? <Loader2 size={20} className="animate-spin text-text-secondary mx-4" /> : stats.totalHadir}
          </div>
        </div>

        <div className="bg-surface p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-primary/5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-1">
              <label className="font-body text-[10px] uppercase tracking-widest text-text-secondary ml-2">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Tulis nama Anda" 
                {...register("name", { required: "Nama wajib diisi" })}
                className={`w-full bg-background border ${errors.name ? 'border-red-400 focus:ring-red-100' : 'border-border-custom focus:ring-accent/10 focus:border-accent/50'} p-4 rounded-2xl font-body text-[13px] text-text-primary focus:outline-none focus:ring-4 transition-all`}
              />
            </div>

            <div className="space-y-1">
              <label className="font-body text-[10px] uppercase tracking-widest text-text-secondary ml-2">Kehadiran</label>
              <select 
                {...register("attendance", { required: "Pilih status kehadiran" })}
                defaultValue=""
                className={`w-full bg-background border ${errors.attendance ? 'border-red-400 focus:ring-red-100' : 'border-border-custom focus:ring-accent/10 focus:border-accent/50'} p-4 rounded-2xl font-body text-[13px] text-text-primary focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer`}
              >
                <option value="" disabled hidden>Pilih status kehadiran</option>
                <option value="Hadir">Ya, Saya akan hadir</option>
                <option value="Tidak Hadir">Mohon maaf, tidak bisa hadir</option>
              </select>
            </div>

            <AnimatePresence>
              {attendanceStatus === 'Hadir' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1 overflow-hidden"
                >
                  <label className="font-body text-[10px] uppercase tracking-widest text-text-secondary ml-2 mt-2 block">Jumlah Hadir</label>
                  <input 
                    type="number" 
                    min="1" max="10"
                    placeholder="Berapa orang yang hadir?" 
                    {...register("jumlahKehadiran", { 
                      required: attendanceStatus === 'Hadir' ? "Jumlah kehadiran wajib diisi" : false,
                      min: { value: 1, message: "Minimal 1 orang" }
                    })}
                    className={`w-full bg-background border ${errors.jumlahKehadiran ? 'border-red-400' : 'border-border-custom focus:ring-accent/10 focus:border-accent/50'} p-4 rounded-2xl font-body text-[13px] text-text-primary focus:outline-none focus:ring-4 transition-all`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="font-body text-[10px] uppercase tracking-widest text-text-secondary ml-2">Pesan Tambahan</label>
              <textarea 
                placeholder="Catatan (Opsional)" 
                rows="3"
                {...register("message")}
                className="w-full bg-background border border-border-custom p-4 rounded-2xl font-body text-[13px] text-text-primary focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/50 transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full relative overflow-hidden bg-primary text-white py-4 rounded-2xl font-body text-[11px] uppercase tracking-widest font-medium shadow-[0_15px_30px_rgba(90,46,46,0.15)] transition-all duration-300 hover:shadow-[0_15px_30px_rgba(90,46,46,0.3)] hover:bg-primary/90 active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Mengirim...</>
              ) : isSuccess ? (
                "Terkonfirmasi ✓"
              ) : (
                <><Send size={14} /> Konfirmasi Kehadiran</>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}