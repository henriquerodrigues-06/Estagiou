import api from './api.js';

const normalizarVaga = (vaga) => {
  if (!vaga) return null;
  return { ...vaga, id: vaga._id || vaga.id };
};

export const listarVagas = async () => {
  const response = await api.get('/vagas');
  return response.data.map(normalizarVaga);
};

export const buscarVagaPorId = async (id) => {
  const response = await api.get(`/vagas/listar/${id}`);
  return normalizarVaga(response.data);
};

export const pesquisarVagas = async (termoBusca) => {
  if (!termoBusca || termoBusca.trim() === '') {
    return await listarVagas();
  }
  const response = await api.get('/vagas/listar/termo', {
    params: { termo: termoBusca }
  });
  return (response.data.vagasFiltradas || []).map(normalizarVaga);
};

export const salvarVaga = async (dadosVaga) => {
  const targetId = dadosVaga.id || dadosVaga._id;
  if (targetId) {
    const response = await api.patch(`/vagas/atualizar/${targetId}`, dadosVaga);
    return normalizarVaga(response.data.dados);
  } else {
    const response = await api.post('/vagas/cadastrar', dadosVaga);
    return normalizarVaga(response.data.dados);
  }
};

export const excluirVaga = async (id) => {
  const response = await api.delete(`/vagas/deletar/${id}`);
  return response.data;
};