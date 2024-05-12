import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async ping() {
    return await this.redisClient.ping();
  }

  async getAllKeys(pattern: string = '*'): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }

  async delete(key: string) {
    return await this.redisClient.del(key);
  }
}
