import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Review API', () => {
  beforeEach(async () => {
    await prisma.review.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const testReview = {
    title: 'Test Review',
    content: 'Test Content',
    rating: 5,
    author: 'Test Author',
  };

  describe('POST /reviews', () => {
    it('should create a review', async () => {
      const res = await request(app)
        .post('/reviews')
        .send(testReview);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject(testReview);
    });

    it('should validate review input', async () => {
      const res = await request(app)
        .post('/reviews')
        .send({ title: 'Test' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /reviews', () => {
    beforeEach(async () => {
      await prisma.review.create({ data: testReview });
    });

    it('should return paginated reviews', async () => {
      const res = await request(app).get('/reviews');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.total).toBe(1);
    });

    it('should filter reviews', async () => {
      const res = await request(app)
        .get('/reviews')
        .query({ author: 'Test Author' });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });
});