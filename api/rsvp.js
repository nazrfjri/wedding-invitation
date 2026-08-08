// api/rsvp.js
import { createClient } from 'redis';

let redisClient;

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

    if (req.method === 'GET') {
      const rawRsvps = await client.lRange('rsvps', 0, -1);
      const rsvps = rawRsvps.map(rsvp => JSON.parse(rsvp));
      
      let totalHadir = 0;
      let totalTidakHadir = 0;
      
      rsvps.forEach(item => {
        if (item.attendance === 'Hadir') {
          // Menambahkan angka dari jumlahKehadiran (pastikan tipe datanya Number)
          totalHadir += Number(item.jumlahKehadiran) || 0; 
        } 
        else if (item.attendance === 'Tidak Hadir') {
          totalTidakHadir += 1;
        }
      });

      res.status(200).json({ totalHadir, totalTidakHadir, totalData: rsvps.length });
    } 
    else if (req.method === 'POST') {
      const { name, attendance, jumlahKehadiran, message } = req.body;
      
      const newRsvp = {
        id: Date.now(),
        name,
        attendance,
        // Jika tidak hadir, jumlah otomatis 0. Jika hadir, simpan angkanya.
        jumlahKehadiran: attendance === 'Hadir' ? Number(jumlahKehadiran) : 0, 
        message,
        createdAt: new Date().toISOString()
      };

      await client.lPush('rsvps', JSON.stringify(newRsvp));
      res.status(200).json(newRsvp);
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