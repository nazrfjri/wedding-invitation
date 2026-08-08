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
      const rawWishes = await client.lRange('wishes', 0, -1);      
      const wishes = rawWishes.map(wish => JSON.parse(wish));      
      res.status(200).json(wishes);
    } 
    
    else if (req.method === 'POST') {
      const { name, message, createdAt } = req.body;
      const newWish = { id: Date.now(), name, message, createdAt };

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