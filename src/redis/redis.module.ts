import { RedisModule as Redis } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Redis.forRoot({
      url: `redis://${process.env.API_REDIS_SERVER}:${process.env.API_REDIS_PORT}`,
      type: 'single',
      options: {
        name: process.env.API_REDIS_OPTIONS_NAME,
      },
    }),
  ],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
