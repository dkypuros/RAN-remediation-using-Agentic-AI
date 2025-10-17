import { Controller, Post, Body } from '@nestjs/common';
import { IpexService } from './ipex.service';
import { GenerationRequest, GenerationResponse } from '../types/api';

@Controller('api/inference')
export class IpexController {
  constructor(private readonly ipexService: IpexService) {}

  @Post()
  async generateText(@Body() request: GenerationRequest): Promise<GenerationResponse> {
    return this.ipexService.generateText(request);
  }
}
