import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
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

  @Get('keys')
  async getKeys(@Query('pattern') pattern: string) {
    try {
      const keys = await this.redisService.getAllKeys(pattern || '*');
      return { keys };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve keys');
    }
  }

  @Get(':key')
  async get(@Param('key') key: string) {
    const value = await this.redisService.getValue(key);

    if (!value) throw new NotFoundException(`The key '${key}' not found`);

    return JSON.parse(value);
  }

  @Delete('flushall')
  async flushAll() {
    try {
      const result = await this.redisService.flushAll();
      return { message: `Redis flush all result: ${result}` };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to flush all data from Redis',
      );
    }
  }

  @Delete(':key')
  async delete(@Param('key') key: string) {
    const value = await this.redisService.getValue(key);

    if (!value) throw new NotFoundException(`The key '${key}' not found`);

    const wasDeleted = await this.redisService.delete(key);
    if (!wasDeleted) {
      throw new NotFoundException(
        `Key '${key}' not found or could not be deleted`,
      );
    }
    return { message: `Key '${key}' deleted successfully` };
  }
}
