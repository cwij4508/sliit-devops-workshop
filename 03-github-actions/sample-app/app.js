const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SLIIT GitHub Actions Workshop!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Simple API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'SLIIT Sample App',
    description: 'Sample application for CI/CD workshop',
    version: '1.0.0',
    author: 'SLIIT DevOps Workshop'
  });
});

// Math API for testing
app.post('/api/calculate', (req, res) => {
  const { operation, a, b } = req.body;
  
  if (!operation || a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  
  let result;
  switch (operation) {
  case 'add':
    result = a + b;
    break;
  case 'subtract':
    result = a - b;
    break;
  case 'multiply':
    result = a * b;
    break;
  case 'divide':
    if (b === 0) {
      return res.status(400).json({ error: 'Division by zero' });
    }
    result = a / b;
    break;
  default:
    return res.status(400).json({ error: 'Invalid operation' });
  }
  
  res.json({ result, operation, a, b });
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack); // eslint-disable-line no-console
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`); // eslint-disable-line no-console
});

module.exports = { app, server };