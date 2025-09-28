const request = require('supertest');
const { app, server } = require('./app');

describe('SLIIT Sample App', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('GET /', () => {
    test('should return welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Welcome to SLIIT GitHub Actions Workshop!');
      expect(response.body.version).toBe('1.0.0');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/info', () => {
    test('should return app info', async () => {
      const response = await request(app).get('/api/info');
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('SLIIT Sample App');
    });
  });

  describe('POST /api/calculate', () => {
    test('should add two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ operation: 'add', a: 5, b: 3 });
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
    });

    test('should subtract two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ operation: 'subtract', a: 10, b: 4 });
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(6);
    });

    test('should multiply two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ operation: 'multiply', a: 6, b: 7 });
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(42);
    });

    test('should divide two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ operation: 'divide', a: 15, b: 3 });
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(5);
    });

    test('should handle division by zero', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ operation: 'divide', a: 10, b: 0 });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Division by zero');
    });

    test('should handle invalid operation', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ operation: 'invalid', a: 1, b: 2 });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid operation');
    });

    test('should handle missing parameters', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ operation: 'add', a: 1 });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required parameters');
    });
  });

  describe('GET /nonexistent', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Route not found');
    });
  });
});