import {
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsString,
  IsOptional,
} from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsNotEmpty()
  @IsString()
  author!: string;
}

export class UpdateReviewDto extends CreateReviewDto {}

export class GetReviewsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  take?: number = 10;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
