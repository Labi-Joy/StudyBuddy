const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();

  // require app AFTER setting env
  app = require('../app');
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Auth endpoints', () => {
  it('should signup and login a user', async () => {
    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'tester',
        email: 'tester@example.com',
        password: 'password123',
      })
      .expect(200);

    expect(signupRes.body.token).toBeDefined();

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'tester@example.com',
        password: 'password123',
      })
      .expect(200);

    expect(loginRes.body.token).toBeDefined();
  });

  it('rejects duplicate signup', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'tester2',
        email: 'dup@example.com',
        password: 'password123',
      })
      .expect(200);

    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'tester3',
        email: 'dup@example.com',
        password: 'password123',
      })
      .expect(400);
  });
});
