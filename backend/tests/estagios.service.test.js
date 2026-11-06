jest.mock('../src/models/estagios.model.js', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn()
  }
}));

import Estagio from '../src/models/estagios.model.js';
import estagiosService from '../src/services/estagios.service.js';

const vagaMock = { _id: '675000000000000000000001', titulo: 'Estágio em Desenvolvimento', empresa: 'Tech', cargo: 'Dev Jr' };

const chainSort = (resultado) => ({
  sort: jest.fn().mockResolvedValue(resultado)
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('estagiosService', () => {
  test('getAll: retorna todas as vagas ordenadas por criação', async () => {
    Estagio.find.mockReturnValue(chainSort([vagaMock]));

    const resultado = await estagiosService.getAll();

    expect(resultado).toEqual([vagaMock]);
    expect(Estagio.find).toHaveBeenCalled();
    expect(Estagio.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
  });

  test('getVagaById: retorna a vaga pelo ID', async () => {
    Estagio.findById.mockResolvedValue(vagaMock);

    const resultado = await estagiosService.getVagaById('675000000000000000000001');

    expect(Estagio.findById).toHaveBeenCalledWith('675000000000000000000001');
    expect(resultado).toEqual(vagaMock);
  });

  test('getVagasByTerm: filtra por termo usando regex', async () => {
    Estagio.find.mockReturnValue(chainSort([vagaMock]));

    const resultado = await estagiosService.getVagasByTerm('tech');

    expect(Estagio.find).toHaveBeenCalledWith({ $or: expect.any(Array) });
    expect(resultado).toEqual([vagaMock]);
  });

  test('createVaga: cria uma nova vaga', async () => {
    Estagio.create.mockResolvedValue(vagaMock);

    const resultado = await estagiosService.createVaga({ titulo: 'Novo' });

    expect(Estagio.create).toHaveBeenCalledWith({ titulo: 'Novo' });
    expect(resultado).toEqual(vagaMock);
  });

  test('updateVaga: atualiza a vaga e devolve a versão nova', async () => {
    Estagio.findByIdAndUpdate.mockResolvedValue(vagaMock);

    const resultado = await estagiosService.updateVaga('id', { cargo: 'Dev Pleno' });

    expect(Estagio.findByIdAndUpdate).toHaveBeenCalledWith('id', { cargo: 'Dev Pleno' }, { new: true });
    expect(resultado).toEqual(vagaMock);
  });

  test('deleteVaga: remove a vaga pelo ID', async () => {
    Estagio.findByIdAndDelete.mockResolvedValue(vagaMock);

    const resultado = await estagiosService.deleteVaga('id');

    expect(Estagio.findByIdAndDelete).toHaveBeenCalledWith('id');
    expect(resultado).toEqual(vagaMock);
  });
});