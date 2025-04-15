import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'movie_db',
  autoLoadModels: true,
  synchronize: true,
})); 