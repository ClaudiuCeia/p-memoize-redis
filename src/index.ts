import * as redis from 'redis';

export class RedisCache {
  static fromOptions(options?: any) {
    const client = redis.createClient(options);
    return new this(client);
  }

  static fromUnixSocket(socket: any, options?: any) {
    const client = redis.createClient(socket, options);
    return new this(client);
  }

  static fromURL(url: any, options?: any) {
    const client = redis.createClient(url, options);
    return new this(client);
  }

  static fromPortHost(port: any, host?: any, options?: any) {
    const client = redis.createClient(port, host, options);
    return new this(client);
  }

  private client: redis.RedisClient;
	constructor(redisClient: redis.RedisClient) {
    redisClient.on("error", (err) => {
        console.log("Error " + err);
    });
    this.client = redisClient;
	}

	has = async (key: string) => {
    return await this.client.exists(key);
	}

	get = async (key: string) => {
    return await this.client.get(key);
	}

	set = async (key: string, value: string | { data: string }) => {
    return await this.client.set(key, (typeof value === 'string') ? value : value.data);
	}

  delete = async (key: string) => {
    return await this.client.del(key);
  }

  clear() {
    return;
  }
}
