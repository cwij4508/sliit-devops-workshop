const express = require('express');
const redis = require('redis');
const app = express();
const port = 3001;

// Redis client setup
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({ url: REDIS_URL });

let redisConnected = false;
let cacheHits = 0;

// Connect to Redis
client.connect().then(() => {
  console.log('✅ Connected to Redis');
  redisConnected = true;
}).catch((err) => {
  console.error('❌ Redis connection error:', err);
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
  redisConnected = false;
});

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'backend',
    timestamp: new Date().toISOString(),
    redis: redisConnected ? 'connected' : 'disconnected'
  });
});

// Status endpoint with Redis interaction
app.get('/api/status', async (req, res) => {
  const startTime = Date.now();
  
  try {
    let redisStatus = 'disconnected';
    let hits = 0;

    if (redisConnected) {
      // Try to interact with Redis
      const key = 'api:hits';
      hits = await client.incr(key);
      cacheHits = hits;
      redisStatus = 'connected';
      
      // Set expiration for the counter (reset daily)
      await client.expire(key, 86400);
    }

    const responseTime = Date.now() - startTime;

    res.json({
      status: 'healthy',
      service: 'backend-api',
      timestamp: new Date().toISOString(),
      responseTime,
      redis: {
        status: redisStatus,
        hits: hits
      },
      container: process.env.HOSTNAME || 'not-containerized'
    });

  } catch (error) {
    console.error('Error in status endpoint:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      redis: { status: 'error', hits: 0 },
      responseTime: Date.now() - startTime
    });
  }
});

// Simple data endpoint
app.get('/api/data', async (req, res) => {
  try {
    const data = {
      message: 'Hello from Backend API!',
      timestamp: new Date().toISOString(),
      service: 'backend',
      container: process.env.HOSTNAME,
      uptime: process.uptime()
    };

    // Try to cache the response in Redis
    if (redisConnected) {
      await client.setEx('api:data', 60, JSON.stringify(data));
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cached data
app.get('/api/cached-data', async (req, res) => {
  try {
    if (!redisConnected) {
      return res.status(503).json({ error: 'Redis not available' });
    }

    const cachedData = await client.get('api:data');
    if (cachedData) {
      res.json({
        cached: true,
        data: JSON.parse(cachedData)
      });
    } else {
      res.json({
        cached: false,
        message: 'No cached data available'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend API listening at http://0.0.0.0:${port}`);
  console.log(`Redis URL: ${REDIS_URL}`);
});