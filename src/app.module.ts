import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisController } from './redis/redis.controller';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(), RedisModule],
  controllers: [RedisController],
})
export class AppModule {}
