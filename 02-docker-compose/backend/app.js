const express = require('express');
const redis = require('redis');
const app = express();
const port = 3001;

// Redis client setup
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({ url: REDIS_URL });

let redisConnected = false;

// Connect to Redis
client.connect().then(() => {
  console.log('Connected to Redis');
  redisConnected = true;
}).catch((err) => {
  console.error('Redis connection error:', err);
});

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'backend',
    redis: redisConnected ? 'connected' : 'disconnected'
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend API listening at http://0.0.0.0:${port}`);
});