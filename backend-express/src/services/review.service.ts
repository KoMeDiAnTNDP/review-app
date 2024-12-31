import { PrismaClient, Review, Prisma } from "@prisma/client";
import {
  CreateReviewDto,
  UpdateReviewDto,
  GetReviewsDto,
} from "../dto/review.dto";
import { BaseResponse, PaginatedResponse } from "../types";

export class ReviewService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(dto: CreateReviewDto): Promise<BaseResponse<Review>> {
    const review = await this.prisma.review.create({
      data: dto,
    });
    return { success: true, data: review };
  }

  async findAll(query: GetReviewsDto): Promise<PaginatedResponse<Review>> {
    const skip = Number(query.skip) || 0;
    const take = Number(query.take) || 10;

    const where: Prisma.ReviewWhereInput = {};
    if (query.author) where.author = query.author;
    if (query.rating) where.rating = Number(query.rating);

    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
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

  async findOne(id: number): Promise<BaseResponse<Review>> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return { success: true, data: review };
  }

  async update(
    id: number,
    dto: UpdateReviewDto,
  ): Promise<BaseResponse<Review>> {
    try {
      const review = await this.prisma.review.update({
        where: { id },
        data: dto,
      });
      return { success: true, data: review };
    } catch (error) {
      throw new Error("Review not found");
    }
  }

  async remove(id: number): Promise<BaseResponse<void>> {
    try {
      await this.prisma.review.delete({
        where: { id },
      });
      return { success: true, message: "Review deleted successfully" };
    } catch (error) {
      throw new Error("Review not found");
    }
  }
}
