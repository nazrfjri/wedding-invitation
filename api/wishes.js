// api/wishes.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // GET: Mengambil semua data ucapan
  if (req.method === 'GET') {
    try {
      // Mengambil daftar dari Redis (0 sampai -1 berarti ambil semua)
      const wishes = await kv.lrange('wishes', 0, -1);
      res.status(200).json(wishes || []);
    } catch (error) {
      res.status(500).json({ error: 'Gagal mengambil data ucapan' });
    }
  } 
  
  // POST: Menambahkan ucapan baru
  else if (req.method === 'POST') {
    try {
      const { name, message, createdAt } = req.body;
      
      const newWish = {
        id: Date.now(),
        name,
        message,
        createdAt
      };

      // Memasukkan data ke urutan paling atas (Left Push / lpush)
      await kv.lpush('wishes', newWish);
      
      res.status(200).json(newWish);
    } catch (error) {
      res.status(500).json({ error: 'Gagal menyimpan ucapan' });
    }
  } 
  
  // Method lain ditolak
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}