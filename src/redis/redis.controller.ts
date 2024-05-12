import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
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
}
