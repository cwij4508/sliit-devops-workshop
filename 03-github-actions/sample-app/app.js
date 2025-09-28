const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from GitHub Actions Workshop!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

// Simple math API for testing
app.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body;
  
  if (!a || !b || !operation) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  
  let result;
  switch (operation) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }
  
  res.json({ result });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`); // eslint-disable-line no-console
});

module.exports = { app, server };