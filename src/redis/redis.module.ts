// redis.module.ts
import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  imports: [
    RedisModule.forRoot({
      url: `redis://${process.env.API_REDIS_SERVER}:${process.env.API_REDIS_PORT}`,
      type: 'single', // Indicates this is a single Redis instance
      options: {
        name: process.env.API_REDIS_OPTIONS_NAME, // Name used for retrieving via InjectRedis
        // Additional Redis client options can be added here if necessary
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class AppRedisModule {}
