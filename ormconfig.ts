import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  synchronize: true,
  type: 'sqlite', // default to sqlite, you can change this as per your needs
  entities: ['**/*.entity.ts'], // default to .ts entities, you can change this as per your needs
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    // Add your production database settings here
    break;
  default:
    throw new Error('unknown environment');
}

export default dbConfig;