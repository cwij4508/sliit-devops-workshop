const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

app.use(express.static('public'));

// Main route
app.get('/', async (req, res) => {
  try {
    // Fetch data from backend
    const response = await axios.get(`${BACKEND_URL}/api/status`);
    const backendData = response.data;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>SLIIT Docker Compose Workshop</title>
          <style>
              body { 
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                  background: linear-gradient(135deg, #2c3e50 0%, #4a6741 100%);
                  color: white;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: rgba(255, 255, 255, 0.1);
                  padding: 30px;
                  border-radius: 15px;
                  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              }
              .service-card {
                  background: rgba(255, 255, 255, 0.1);
                  padding: 20px;
                  border-radius: 10px;
                  margin: 15px 0;
                  border-left: 4px solid #3498db;
              }
              .status { color: #2ecc71; font-weight: bold; }
              .error { color: #e74c3c; }
              h1 { color: #ecf0f1; text-align: center; }
              .refresh-btn {
                  background: #3498db;
                  color: white;
                  padding: 10px 20px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  margin: 10px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>🐳 Docker Compose Multi-Service App</h1>
              
              <div class="service-card">
                  <h3>📦 Frontend Service</h3>
                  <p><strong>Status:</strong> <span class="status">Running</span></p>
                  <p><strong>Container:</strong> ${process.env.HOSTNAME || 'Not in container'}</p>
                  <p><strong>Port:</strong> 3000</p>
              </div>

              <div class="service-card">
                  <h3>⚡ Backend Service</h3>
                  <p><strong>Status:</strong> <span class="status">${backendData.status}</span></p>
                  <p><strong>Response Time:</strong> ${backendData.responseTime}ms</p>
                  <p><strong>Redis Status:</strong> ${backendData.redis.status}</p>
                  <p><strong>Cache Hits:</strong> ${backendData.redis.hits}</p>
              </div>

              <div class="service-card">
                  <h3>🔄 Services Communication</h3>
                  <p>Frontend successfully communicating with Backend API</p>
                  <p>Backend connected to Redis cache</p>
                  <p><strong>Last Updated:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <button class="refresh-btn" onclick="window.location.reload()">🔄 Refresh Data</button>
          </div>
      </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    console.error('Error connecting to backend:', error.message);
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body style="font-family: Arial; padding: 50px;">
          <h1 style="color: red;">Backend Connection Error</h1>
          <p>Could not connect to backend service: ${error.message}</p>
          <p>Make sure all services are running with: docker-compose up</p>
      </body>
      </html>
    `;
    res.status(500).send(errorHtml);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Frontend service listening at http://0.0.0.0:${port}`);
  console.log(`Backend URL: ${BACKEND_URL}`);
});