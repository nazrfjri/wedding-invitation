// src/features/rsvp/Rsvp.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Heart, Loader2, Users } from 'lucide-react';

export default function Rsvp() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  // State untuk API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stats, setStats] = useState({ totalHadir: 0, totalTidakHadir: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Fungsi untuk mengambil statistik RSVP dari Vercel KV
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

  // Ambil data saat pertama kali komponen dimuat
  useEffect(() => {
    fetchStats();
  }, []);

  // Fungsi saat form dikirim
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
        fetchStats(); // Update angka statistik secara real-time setelah submit
        setTimeout(() => setIsSuccess(false), 5000); // Hilangkan pesan sukses setelah 5 detik
      }
    } catch (error) {
      console.error("Gagal mengirim RSVP");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 px-6 bg-background flex flex-col items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="font-heading text-4xl text-primary mb-3 italic">
            RSVP
          </h2>
          <Heart size={16} className="text-accent fill-accent/20 mb-4" />
          <p className="font-body text-sm text-text-secondary">
            Mohon konfirmasi kehadiran Anda<br/>sebelum 14 Agustus 2026
          </p>
        </div>

        {/* --- Bagian API Stats: Menampilkan Total Kehadiran --- */}
        <div className="bg-secondary/50 border border-border-custom p-4 rounded-2xl mb-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center shadow-sm">
              <Users size={18} className="text-accent" />
            </div>
            <span className="font-heading text-sm text-primary">Tamu Hadir</span>
          </div>
          <div className="font-body text-lg font-bold text-primary">
            {isLoadingStats ? <Loader2 size={16} className="animate-spin text-text-secondary" /> : `${stats.totalHadir} Orang`}
          </div>
        </div>
        {/* ----------------------------------------------------- */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              {...register("name", { required: "Nama wajib diisi" })}
              className={`w-full bg-surface border ${errors.name ? 'border-red-400' : 'border-border-custom'} p-4 rounded-xl font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors`}
            />
          </div>

          <div>
            <select 
              {...register("attendance", { required: "Pilih status kehadiran" })}
              defaultValue=""
              className={`w-full bg-surface border ${errors.attendance ? 'border-red-400' : 'border-border-custom'} p-4 rounded-xl font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors`}
            >
              <option value="" disabled hidden>Hadir dengan</option>
              <option value="Hadir (1 Orang)">Hadir (1 Orang)</option>
              <option value="Hadir (2 Orang)">Hadir (2 Orang)</option>
              <option value="Tidak Hadir">Mohon maaf, tidak bisa hadir</option>
            </select>
          </div>

          <div>
            <textarea 
              placeholder="Pesan untuk kami (Opsional)" 
              rows="3"
              {...register("message")}
              className="w-full bg-surface border border-border-custom p-4 rounded-xl font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-body text-sm tracking-wide shadow-button transition-transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-80"
          >
            {isSubmitting ? (
              <><Loader2 size={18} className="animate-spin" /> Mengirim...</>
            ) : isSuccess ? (
              "Terkonfirmasi ✓"
            ) : (
              "Kirim Konfirmasi"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}