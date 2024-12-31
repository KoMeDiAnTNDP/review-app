import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateReviewDto, UpdateReviewDto, GetReviewsDto } from "./reviews.dto";
import { PaginatedResponseDto, BaseResponseDto } from "../common/response.dto";
import { Review, Prisma } from "@prisma/client";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<BaseResponseDto<Review>> {
    const review = await this.prisma.review.create({
      data: createReviewDto,
    });
    return { success: true, data: review };
  }

  async findAll(query: GetReviewsDto): Promise<PaginatedResponseDto<Review>> {
    const skip = parseInt(String(query.skip ?? 0));
    const take = parseInt(String(query.take ?? 10));
    
    const where: Prisma.ReviewWhereInput = {};
    
    if (query.author) {
      where.author = query.author;
    }
    
    if (query.rating) {
      where.rating = parseInt(String(query.rating));
    }

    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.review.count({ where }),
    ]);

    return {
      success: true,
      data: items,
      total,
      page: Math.floor(skip / take) + 1,
      limit: take,
    };
  }

  async findOne(id: number): Promise<BaseResponseDto<Review>> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review #${id} not found`);
    }

    return { success: true, data: review };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<BaseResponseDto<Review>> {
    try {
      const review = await this.prisma.review.update({
        where: { id },
        data: updateReviewDto,
      });
      return { success: true, data: review };
    } catch (error) {
      throw new NotFoundException(`Review #${id} not found`);
    }
  }

  async remove(id: number): Promise<BaseResponseDto<void>> {
    try {
      await this.prisma.review.delete({
        where: { id },
      });
      return { success: true, message: "Review deleted successfully" };
    } catch (error) {
      throw new NotFoundException(`Review #${id} not found`);
    }
  }
}