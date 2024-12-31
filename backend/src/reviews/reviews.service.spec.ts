import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let prisma: PrismaService;

  const mockReview = {
    id: 1,
    title: 'Test Review',
    content: 'Test Content',
    rating: 5,
    author: 'Test Author',
    createdAt: new Date(),
  };

  const mockPrisma = {
    review: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const dto = {
        title: 'New Review',
        content: 'Great product',
        rating: 5,
        author: 'John Doe',
      };

      mockPrisma.review.create.mockResolvedValue({ ...mockReview, ...dto });

      const result = await service.create(dto);
      expect(result).toEqual({
        success: true,
        data: { ...mockReview, ...dto }
      });
      expect(mockPrisma.review.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return paginated reviews', async () => {
      const query = { skip: 0, take: 10 };
      mockPrisma.review.findMany.mockResolvedValue([mockReview]);
      mockPrisma.review.count.mockResolvedValue(1);

      const result = await service.findAll(query);
      expect(result).toEqual({
        success: true,
        data: [mockReview],
        total: 1,
        page: 1,
        limit: 10
      });
      expect(mockPrisma.review.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' }
      });
    });

    it('should apply filters correctly', async () => {
      const query = { author: 'Test Author', rating: 5, skip: 0, take: 10 };
      mockPrisma.review.findMany.mockResolvedValue([mockReview]);
      mockPrisma.review.count.mockResolvedValue(1);

      const result = await service.findAll(query);
      expect(result).toEqual({
        success: true,
        data: [mockReview],
        total: 1,
        page: 1,
        limit: 10
      });
      expect(mockPrisma.review.findMany).toHaveBeenCalledWith({
        where: { author: 'Test Author', rating: 5 },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' }
      });
    });
  });

  describe('findOne', () => {
    it('should return a review if found', async () => {
      mockPrisma.review.findUnique.mockResolvedValue(mockReview);

      const result = await service.findOne(1);
      expect(result).toEqual({
        success: true,
        data: mockReview
      });
    });

    it('should throw NotFoundException if review not found', async () => {
      mockPrisma.review.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto = {
      title: 'Updated Review',
      content: 'Updated content',
      rating: 4,
      author: 'John Doe',
    };

    it('should update a review if found', async () => {
      mockPrisma.review.update.mockResolvedValue({ ...mockReview, ...updateDto });

      const result = await service.update(1, updateDto);
      expect(result).toEqual({
        success: true,
        data: { ...mockReview, ...updateDto }
      });
    });

    it('should throw NotFoundException if review not found', async () => {
      mockPrisma.review.update.mockRejectedValue(new Error());

      await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a review if found', async () => {
      mockPrisma.review.delete.mockResolvedValue(mockReview);

      const result = await service.remove(1);
      expect(result).toEqual({
        success: true,
        message: 'Review deleted successfully'
      });
    });

    it('should throw NotFoundException if review not found', async () => {
      mockPrisma.review.delete.mockRejectedValue(new Error());

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});