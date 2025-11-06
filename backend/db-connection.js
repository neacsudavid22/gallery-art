import { DataSource } from 'typeorm';
import { ArtSchema } from './art-model.js';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: process.env.DB_HOST || '193.226.34.57',
  port: 1521,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  serviceName: process.env.DB_SERVICE || 'orclpdb', 
  synchronize: true,
  logging: false,
  entities: [ArtSchema]
});
