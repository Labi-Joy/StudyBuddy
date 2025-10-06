jest.mock('../src/services/fileServices', () => ({
  uploadBufferToCloudinary: jest.fn().mockResolvedValue('https://example.com/fake.pdf'),
}));

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();

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

describe('Notes upload', () => {
  let token;

  it('signup and get token', async () => {
    const signup = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'uploader',
        email: 'upload@example.com',
        password: 'password123',
      })
      .expect(200);

    token = signup.body.token;
    expect(token).toBeDefined();
  });

  it('uploads a text file', async () => {
    const res = await request(app)
      .post('/api/notes/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('This is test content'), {
        filename: 'test.txt',
        contentType: 'text/plain',
      })
      .expect(200);

    expect(res.body.note).toBeDefined();
    expect(res.body.note.fileUrl).toContain('https://example.com');
  });
});
