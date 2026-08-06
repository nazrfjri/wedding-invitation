import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Heart } from 'lucide-react';
import { invitationData } from '../../data/invitations';

export default function Rsvp() {
  const { contact } = invitationData;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Format pesan untuk WhatsApp
    const text = `Halo, saya ingin mengonfirmasi kehadiran acara pernikahan Putri & Zagar.%0A%0ANama: ${data.name}%0AKehadiran: ${data.attendance}%0APesan: ${data.message}%0A%0ATerima kasih.`;
    const waLink = `https://wa.me/${contact.whatsapp}?text=${text}`;
    
    // Buka tab/aplikasi WhatsApp
    window.open(waLink, '_blank');
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
        <div className="text-center mb-10 flex flex-col items-center">
          <h2 className="font-heading text-4xl text-primary mb-3 italic">
            RSVP
          </h2>
          <Heart size={16} className="text-accent fill-accent/20 mb-4" />
          <p className="font-body text-sm text-text-secondary">
            Mohon konfirmasi kehadiran Anda<br/>sebelum 1 Agustus 2026
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Input Nama */}
          <div>
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              {...register("name", { required: "Nama wajib diisi" })}
              className={`w-full bg-surface border ${errors.name ? 'border-red-400' : 'border-border-custom'} p-4 rounded-xl font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors`}
            />
            {errors.name && <span className="text-red-500 text-xs mt-1 block px-2">{errors.name.message}</span>}
          </div>

          {/* Select Kehadiran */}
          <div>
            <select 
              {...register("attendance", { required: "Pilih status kehadiran" })}
              className={`w-full bg-surface border ${errors.attendance ? 'border-red-400' : 'border-border-custom'} p-4 rounded-xl font-body text-sm text-text-primary appearance-none focus:outline-none focus:border-accent transition-colors`}
            >
              <option value="" disabled selected hidden>Hadir dengan</option>
              <option value="Hadir (1 Orang)">Hadir (1 Orang)</option>
              <option value="Hadir (2 Orang)">Hadir (2 Orang)</option>
              <option value="Tidak Hadir">Mohon maaf, tidak bisa hadir</option>
            </select>
            {errors.attendance && <span className="text-red-500 text-xs mt-1 block px-2">{errors.attendance.message}</span>}
          </div>

          {/* Textarea Pesan */}
          <div>
            <textarea 
              placeholder="Pesan untuk kami" 
              rows="4"
              {...register("message")}
              className="w-full bg-surface border border-border-custom p-4 rounded-xl font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-body text-sm tracking-wide shadow-button transition-transform active:scale-[0.98] mt-4"
          >
            Kirim Konfirmasi
          </button>
        </form>
      </motion.div>
    </section>
  );
}