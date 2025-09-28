const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/health`);
    res.send(`
      <h1>Frontend Service</h1>
      <p>Backend Status: ${response.data.status}</p>
      <p>This is a simple multi-service app with Docker Compose.</p>
    `);
  } catch (error) {
    res.send(`
      <h1>Frontend Service</h1>
      <p>Backend Status: Error connecting</p>
      <p>Make sure all services are running with: docker-compose up</p>
    `);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Frontend service listening at http://0.0.0.0:${port}`);
});