// api/reset-wishes.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Ganti 'KODE_RAHASIA_ANDA' dengan password terserah Anda, misal: 'nazar123'
  const SECRET_KEY = 'zagar2026'; 
  
  // Mengambil token dari URL (contoh: /api/reset-wishes?token=nazar123)
  const token = req.query.token;

  if (token !== SECRET_KEY) {
    return res.status(401).json({ error: 'Akses Ditolak. Token salah.' });
  }

  try {
    // Menghapus key 'wishes' dari database
    await kv.del('wishes');
    res.status(200).json({ message: 'Semua data ucapan berhasil di-reset!' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal me-reset data' });
  }
}