import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './db-connection.js';
import { artRouter } from './art-routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log('Connected to Oracle via TypeORM'))
  .catch((err) => console.error('TypeORM connection error:', err));

app.use('/api/art', artRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
