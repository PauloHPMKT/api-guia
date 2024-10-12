import { Inject, Injectable } from '@nestjs/common';
import { CreateChatRepository } from '../protocols/create-chat.repository';
import { createPrompt } from '../../domain/factories/prompts';
import { CreateReviewDto } from '../../presentation/dto/create-review.dto';
import {
  CreateChatDto,
  ChatRole,
} from '../../presentation/dto/create-chat.dto';

@Injectable()
export class CreateChatReviewUsecase {
  constructor(
    @Inject('CreateChatRepository')
    private readonly createChatRepository: CreateChatRepository,
  ) {}

  async execute({ content, intention }: CreateReviewDto): Promise<string> {
    try {
      const prompt = createPrompt(content, intention);
      const request: CreateChatDto = {
        messages: [{ role: ChatRole.USER, content: prompt }],
      };
      return await this.createChatRepository.createChat(request);
    } catch (error) {
      throw new Error('Error creating chat review');
    }
  }
}
