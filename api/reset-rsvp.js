import { createClient } from 'redis';

export default async function handler(req, res) {
  const SECRET_KEY = 'zagar2026'; 
  const token = req.query.token;

  if (token !== SECRET_KEY) {
    return res.status(401).json({ error: 'Akses Ditolak. Token salah.' });
  }

  try {
    const client = createClient({
      url: process.env.REDIS_URL || process.env.KV_URL
    });
    
    await client.connect();
    await client.del('rsvps');
    await client.quit();

    res.status(200).json({ message: 'Semua data RSVP berhasil di-reset!' });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: 'Gagal me-reset data RSVP' });
  }
}