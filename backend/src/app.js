import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import estagiosRoutes from './routes/estagios.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/vagas', estagiosRoutes);

export default app;