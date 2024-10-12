import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateChatReviewUsecase } from '../../application/usecases/CreateChatReview.usecase';
import { CreateReviewDto } from '../dto/create-review.dto';

@Controller('content-reviewer')
export class ReviewerController {
  constructor(
    @Inject('CreateChatContentReviewUsecase')
    private readonly createChatReviewUsecase: CreateChatReviewUsecase,
  ) {}

  @Post('v1/chat/completions')
  async handle(@Body() createReview: CreateReviewDto): Promise<string> {
    try {
      const { content, intention } = createReview;
      const result = await this.createChatReviewUsecase.execute({
        content,
        intention,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        'Erro ao processar a solicitação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
