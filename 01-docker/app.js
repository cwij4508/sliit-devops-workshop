const express = require('express');
const app = express();
const port = 3000;

// Simple route that returns HTML
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>SLIIT DevOps Workshop</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                padding: 50px;
                margin: 0;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                max-width: 600px;
                margin: 0 auto;
            }
            h1 { color: #fff; margin-bottom: 20px; }
            .info { margin: 20px 0; }
            .docker-info { 
                background: rgba(0, 0, 0, 0.2); 
                padding: 15px; 
                border-radius: 8px; 
                margin: 15px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🐳 Welcome to Docker Workshop!</h1>
            <div class="info">
                <p>Congratulations! You've successfully containerized your first application.</p>
                <div class="docker-info">
                    <p><strong>Container ID:</strong> ${process.env.HOSTNAME || 'Not in container'}</p>
                    <p><strong>Node.js Version:</strong> ${process.version}</p>
                    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                </div>
                <p>This simple web server is running inside a Docker container!</p>
            </div>
        </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 SLIIT Workshop app listening at http://0.0.0.0:${port}`);
  console.log('Docker container is running successfully!');
});