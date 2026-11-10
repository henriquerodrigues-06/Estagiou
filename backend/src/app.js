import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import estagiosRoutes from './routes/estagios.routes.js';
import swaggerSpec from './config/swagger.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cors());

// Documentação da API (Swagger) disponível em /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da aplicação
app.use('/vagas', estagiosRoutes);

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'Bem-vindo ao Estagiou.' });
});

// Rota não encontrada (404)
app.use(notFound);

// Tratamento central de erros
app.use(errorHandler);

export default app;