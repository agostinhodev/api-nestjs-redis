// redis.module.ts
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IORedisModule.forRoot({
      url: `redis://${process.env.API_REDIS_SERVER}:${process.env.API_REDIS_PORT}`,
      type: 'single', // Indicates this is a single Redis instance
      options: {
        name: process.env.API_REDIS_OPTIONS_NAME,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
