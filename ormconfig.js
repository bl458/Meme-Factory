module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        type: 'mysql',
        host: 'mysql',
        port: '3306',
        username: 'test',
        password: 'test',
        database: 'memeFactory',
      }
    : {
        type: process.env.CONNECTION,
        host: process.env.HOST,
        port: process.env.PORT,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        synchronize: process.env.SYNCHRONIZE === 'true',
        logging: process.env.LOGGING === 'true',
        entities: [
          process.env.NODE_ENV
            ? process.env.ENTITIES_RUN
            : process.env.ENTITIES,
        ],
        migrations: [
          process.env.NODE_ENV
            ? process.env.MIGRATIONS_RUN
            : process.env.MIGRATIONS,
        ],
        subscribers: [
          process.env.NODE_ENV
            ? process.env.SUBSCRIBERS_RUN
            : process.env.SUBSCRIBERS,
        ],
        cli: {
          entitiesDir: process.env.ENTITIES_DIR,
          migrationsDir: process.env.MIGRATIONS_DIR,
          subscribersDir: process.env.SUBSCRIBERS_DIR,
        },
        cache: {
          type: process.env.CACHE_TYPE,
          options: {
            host: process.env.CACHE_HOST,
            port: process.env.CACHE_PORT,
          },
        },
      };
