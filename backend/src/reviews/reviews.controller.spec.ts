import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';
import { NotFoundException } from '@nestjs/common';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  const mockReview = {
    id: 1,
    title: 'Test Review',
    content: 'Test Content',
    rating: 5,
    author: 'Test Author',
    createdAt: new Date(),
  };

  const mockReviewsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const dto: CreateReviewDto = {
        title: 'New Review',
        content: 'Great product',
        rating: 5,
        author: 'John Doe',
      };

      mockReviewsService.create.mockResolvedValue({ ...mockReview, ...dto });

      const result = await controller.create(dto);
      expect(result).toEqual({ ...mockReview, ...dto });
      expect(mockReviewsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return paginated reviews', async () => {
      const query = { skip: 0, take: 10 };
      const expected = {
        items: [mockReview],
        total: 1,
      };

      mockReviewsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll(query);
      expect(result).toEqual(expected);
      expect(mockReviewsService.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return a review', async () => {
      mockReviewsService.findOne.mockResolvedValue(mockReview);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockReview);
      expect(mockReviewsService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException for non-existent review', async () => {
      mockReviewsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const dto: UpdateReviewDto = {
        title: 'Updated Review',
        content: 'Updated content',
        rating: 4,
        author: 'John Doe',
      };

      mockReviewsService.update.mockResolvedValue({ ...mockReview, ...dto });

      const result = await controller.update(1, dto);
      expect(result).toEqual({ ...mockReview, ...dto });
      expect(mockReviewsService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      mockReviewsService.remove.mockResolvedValue(undefined);

      await controller.remove(1);
      expect(mockReviewsService.remove).toHaveBeenCalledWith(1);
    });
  });
});