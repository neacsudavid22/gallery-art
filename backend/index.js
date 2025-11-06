import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './db-connection.js';
import { artRouter } from './art-routes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log('Connected to Oracle via TypeORM'))
  .catch((err) => console.error('TypeORM connection error:', err));

app.use('/api/art', artRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running`));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});