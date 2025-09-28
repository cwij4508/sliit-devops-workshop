const request = require('supertest');
const { app, server } = require('./app');

describe('Simple App', () => {
  afterAll((done) => {
    server.close(done);
  });

  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello from GitHub Actions Workshop!');
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('POST /calculate should add numbers', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ a: 5, b: 3, operation: 'add' });
    
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(8);
  });

  test('POST /calculate should handle missing parameters', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ a: 1 });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing parameters');
  });
});