import { IsNotEmpty, IsInt, Min, Max, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @ApiProperty({ example: 'Great Restaurant Experience' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'The food was amazing and service excellent.' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  author: string;
}

export class UpdateReviewDto extends CreateReviewDto {}

export class GetReviewsDto {
  @ApiProperty({ required: false, minimum: 0, example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @ApiProperty({ required: false, minimum: 1, maximum: 200, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  take?: number = 10;

  @ApiProperty({ required: false, example: 'John Doe' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ required: false, minimum: 1, maximum: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}