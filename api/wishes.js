// api/wishes.js
import { createClient } from 'redis';

let redisClient;

// Fungsi untuk menghubungkan ke Redis (menggunakan URL dari Vercel)
async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL || process.env.KV_URL
    });
    redisClient.on('error', (err) => console.error('Redis Error:', err));
    await redisClient.connect();
  }
  return redisClient;
}

export default async function handler(req, res) {
  try {
    const client = await getRedisClient();

    // GET: Mengambil semua data ucapan
    if (req.method === 'GET') {
      // Ambil daftar dari Redis
      const rawWishes = await client.lRange('wishes', 0, -1);
      
      // Redis native menyimpan data sebagai string, jadi kita ubah kembali ke JSON (Object)
      const wishes = rawWishes.map(wish => JSON.parse(wish));
      
      res.status(200).json(wishes);
    } 
    
    // POST: Menambahkan ucapan baru
    else if (req.method === 'POST') {
      const { name, message, createdAt } = req.body;
      const newWish = { id: Date.now(), name, message, createdAt };

      // Simpan ke Redis (harus diubah jadi string dulu dengan JSON.stringify)
      await client.lPush('wishes', JSON.stringify(newWish));
      
      res.status(200).json(newWish);
    } 
    
    else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: 'Gagal memproses data di server' });
  }
}