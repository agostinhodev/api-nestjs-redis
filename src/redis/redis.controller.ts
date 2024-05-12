import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('ping')
  async ping() {
    const ping = await this.redisService.ping();

    if (ping !== 'PONG') throw new InternalServerErrorException('Redis gone');

    return { ping };
  }

  @Post('set')
  async set(@Body() body: { key: string; value: Record<string, any> }) {
    if (!body.key || !body.value) {
      throw new InternalServerErrorException('Key and Value are required');
    }

    await this.redisService.setValue(body.key, JSON.stringify(body.value));
    return { message: 'Value set successfully' };
  }
}
