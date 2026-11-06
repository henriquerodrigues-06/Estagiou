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

import estagiosController from '../src/controllers/estagios.controller.js';
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

// Cria um objeto res que "encadeia" status().json() e expõe o body recebido.
function criarResMock() {
  const res = { body: undefined, statusCode: undefined };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockImplementation((payload) => {
    res.body = payload;
    return res;
  });
  return res;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('estagiosController.getAll', () => {
  test('retorna todas as vagas com status 200', async () => {
    estagiosService.getAll.mockResolvedValue([vagaMock]);
    const res = criarResMock();

    await estagiosController.getAll({}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([vagaMock]);
  });

  test('encaminha o erro para o next quando o service falha', async () => {
    estagiosService.getAll.mockRejectedValue(new Error('falha'));
    const next = jest.fn();

    await estagiosController.getAll({}, criarResMock(), next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('estagiosController.getVagaById', () => {
  test('retorna a vaga encontrada com status 200', async () => {
    estagiosService.getVagaById.mockResolvedValue(vagaMock);
    const res = criarResMock();

    await estagiosController.getVagaById({ params: { id: vagaMock._id } }, res, jest.fn());

    expect(estagiosService.getVagaById).toHaveBeenCalledWith(vagaMock._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(vagaMock);
  });

  test('retorna 404 quando a vaga não existe', async () => {
    estagiosService.getVagaById.mockResolvedValue(null);
    const next = jest.fn();

    await estagiosController.getVagaById({ params: { id: 'x' } }, criarResMock(), next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 404 }));
  });
});

describe('estagiosController.getVagaByTerm', () => {
  test('retorna vagas filtradas por termo', async () => {
    estagiosService.getVagasByTerm.mockResolvedValue([vagaMock]);
    const res = criarResMock();

    await estagiosController.getVagaByTerm({ query: { termo: 'Dev' } }, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ vagasFiltradas: [vagaMock] });
  });

  test('retorna 400 quando o termo não é informado', async () => {
    const next = jest.fn();

    await estagiosController.getVagaByTerm({ query: {} }, criarResMock(), next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400 }));
  });
});
describe('estagiosController.createVaga', () => {
  const corpoValido = {
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

  test('cria uma vaga com sucesso e retorna 201', async () => {
    estagiosService.createVaga.mockResolvedValue({ ...vagaMock });
    const res = criarResMock();

    await estagiosController.createVaga({ body: corpoValido }, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: 'Nova vaga criada com sucesso!' }));
  });

  test('retorna 400 quando faltam campos obrigatórios', async () => {
    const next = jest.fn();

    await estagiosController.createVaga({ body: { titulo: 'Só título' } }, criarResMock(), next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400 }));
  });
});

describe('estagiosController.updateVaga', () => {
  // Corpo com TODOS os campos — cobre o branch "true" de cada validação de campo.
  const corpoCompleto = {
    titulo: 'Novo Título',
    cargo: 'Dev Pleno',
    empresa: 'Tech 2',
    localizacao: 'São José',
    cursos: 'ADS, Eng. Software',
    competencias: 'Node',
    bolsa: 2000,
    cargaHoraria: '40h',
    modelo: 'Híbrido',
    periodo: '2025.2',
    transporte: 200,
    alimentacao: 50,
    idiomas: 'Inglês',
    atividades: 'Desenvolvimento',
    informacoesExtras: 'Vale VR'
  };

  test('atualiza uma vaga com todos os campos e retorna 200', async () => {
    estagiosService.updateVaga.mockResolvedValue({ ...vagaMock, cargo: 'Dev Pleno' });
    const res = criarResMock();

    await estagiosController.updateVaga(
      { params: { id: vagaMock._id }, body: corpoCompleto },
      res,
      jest.fn()
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: 'Vaga atualizada com sucesso!' }));
  });

  test('atualiza uma vaga com apenas um campo (cobre campos ausentes)', async () => {
    estagiosService.updateVaga.mockResolvedValue({ ...vagaMock });
    const res = criarResMock();

    await estagiosController.updateVaga(
      { params: { id: vagaMock._id }, body: { titulo: 'Só título' } },
      res,
      jest.fn()
    );

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('retorna 400 quando nenhum campo é informado', async () => {
    const next = jest.fn();

    await estagiosController.updateVaga({ params: { id: vagaMock._id }, body: {} }, criarResMock(), next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400 }));
  });

  test('retorna 404 quando a vaga não é encontrada', async () => {
    estagiosService.updateVaga.mockResolvedValue(null);
    const next = jest.fn();

    await estagiosController.updateVaga({ params: { id: 'x' }, body: { cargo: 'Dev' } }, criarResMock(), next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 404 }));
  });
});

describe('estagiosController.deleteVaga', () => {
  test('exclui uma vaga com sucesso e retorna 200', async () => {
    estagiosService.deleteVaga.mockResolvedValue({ ...vagaMock });
    const res = criarResMock();

    await estagiosController.deleteVaga({ params: { id: vagaMock._id } }, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: 'Vaga excluída com sucesso!' }));
  });

  test('retorna 404 quando a vaga não é encontrada', async () => {
    estagiosService.deleteVaga.mockResolvedValue(null);
    const next = jest.fn();

    await estagiosController.deleteVaga({ params: { id: 'x' } }, criarResMock(), next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 404 }));
  });
});