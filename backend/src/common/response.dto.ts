import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  error?: string;
}

export class PaginatedResponseDto<T> extends BaseResponseDto<T[]> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}