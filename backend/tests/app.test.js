jest.mock('../src/services/estagios.service.js', () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
    getVagaById: jest.fn(),
    getVagasByTerm: jest.fn(),
    createVaga: jest.fn(),
    updateVaga: jest.fn(),
    deleteVaga: jest.fn()
  }
}));

import request from 'supertest';
import app from '../src/app.js';
import estagiosService from '../src/services/estagios.service.js';

const vagaMock = {
  _id: '675000000000000000000001',
  titulo: 'Estágio Dev',
  cargo: 'Dev Jr',
  empresa: 'Tech',
  localizacao: 'Florianópolis',
  cursos: 'ADS',
  competencias: 'JavaScript',
  bolsa: 1500,
  cargaHoraria: '30h',
  modelo: 'Presencial'
};

beforeEach(() => {
  jest.clearAllMocks();
  estagiosService.getAll.mockResolvedValue([vagaMock]);
  estagiosService.getVagaById.mockResolvedValue(vagaMock);
  estagiosService.getVagasByTerm.mockResolvedValue([vagaMock]);
  estagiosService.createVaga.mockResolvedValue(vagaMock);
  estagiosService.updateVaga.mockResolvedValue(vagaMock);
  estagiosService.deleteVaga.mockResolvedValue(vagaMock);
});

describe('Integração da API (rotas + middlewares)', () => {
  test('GET / retorna a mensagem de boas-vindas', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.mensagem).toMatch(/Estagiou/i);
  });

  test('GET /vagas lista todas as vagas', async () => {
    const res = await request(app).get('/vagas');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('POST /vagas/cadastrar cria uma vaga válida', async () => {
    const res = await request(app).post('/vagas/cadastrar').send(vagaMock);
    expect(res.status).toBe(201);
  });

  test('POST /vagas/cadastrar retorna 400 sem campos obrigatórios', async () => {
    const res = await request(app).post('/vagas/cadastrar').send({ titulo: 'x' });
    expect(res.status).toBe(400);
    expect(res.body.mensagem).toBe('Campos obrigatórios ausentes.');
  });

  test('rota inexistente retorna 404 (middleware notFound)', async () => {
    const res = await request(app).get('/rota-que-nao-existe');
    expect(res.status).toBe(404);
    expect(res.body.mensagem).toBe('Rota não encontrada.');
  });

  test('erro interno retorna 500 pelo middleware errorHandler', async () => {
    estagiosService.getAll.mockRejectedValue(new Error('boom'));
    const res = await request(app).get('/vagas');
    expect(res.status).toBe(500);
    expect(res.body.mensagem).toBe('Erro interno do servidor.');
  });

  test('ID inválido (CastError) retorna 400 pelo errorHandler', async () => {
    const castError = new Error('CastError');
    castError.name = 'CastError';
    estagiosService.getVagaById.mockRejectedValue(castError);
    const res = await request(app).get('/vagas/listar/id-invalido');
    expect(res.status).toBe(400);
    expect(res.body.mensagem).toBe('ID inválido.');
  });

  test('erro de validação do Mongoose (ValidationError) retorna 400 pelo errorHandler', async () => {
    const validationError = new Error('ValidationError');
    validationError.name = 'ValidationError';
    validationError.errors = { titulo: { message: 'Campo obrigatório' } };
    estagiosService.getAll.mockRejectedValue(validationError);
    const res = await request(app).get('/vagas');
    expect(res.status).toBe(400);
    expect(res.body.mensagem).toBe('Dados inválidos.');
  });

  test('SWAGGER: GET /api-docs carrega a documentação', async () => {
    const res = await request(app).get('/api-docs/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});