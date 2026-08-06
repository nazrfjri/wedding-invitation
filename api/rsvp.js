// api/rsvp.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // GET: Mengambil data dan menghitung total
  if (req.method === 'GET') {
    try {
      const rsvps = await kv.lrange('rsvps', 0, -1);
      const list = rsvps || [];
      
      // Kalkulasi total kehadiran
      let totalHadir = 0;
      let totalTidakHadir = 0;
      
      list.forEach(item => {
        if (item.attendance === 'Hadir (1 Orang)') {
          totalHadir += 1;
        } else if (item.attendance === 'Hadir (2 Orang)') {
          totalHadir += 2;
        } else if (item.attendance === 'Tidak Hadir') {
          totalTidakHadir += 1;
        }
      });

      res.status(200).json({ totalHadir, totalTidakHadir, totalData: list.length });
    } catch (error) {
      res.status(500).json({ error: 'Gagal mengambil data RSVP' });
    }
  } 
  // POST: Menyimpan data RSVP baru
  else if (req.method === 'POST') {
    try {
      const { name, attendance, message } = req.body;
      
      const newRsvp = {
        id: Date.now(),
        name,
        attendance,
        message,
        createdAt: new Date().toISOString()
      };

      await kv.lpush('rsvps', newRsvp);
      res.status(200).json(newRsvp);
    } catch (error) {
      res.status(500).json({ error: 'Gagal menyimpan RSVP' });
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}