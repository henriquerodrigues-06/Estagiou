import estagiosService from "../services/estagios.service.js";
import sanitizeUtil from "../utils/sanitize.util.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from 'mongoose';

// Converte os dados recebidos e sanitiza cada campo antes de salvar.
function montarDadosVaga(campos) {
  return {
    titulo: sanitizeUtil.sanitizeTerm(campos.titulo),
    cargo: sanitizeUtil.sanitizeTerm(campos.cargo),
    empresa: sanitizeUtil.sanitizeTerm(campos.empresa),
    localizacao: sanitizeUtil.sanitizeFormattedTerm(campos.localizacao),
    cursos: sanitizeUtil.sanitizeFormattedTerm(campos.cursos),
    competencias: sanitizeUtil.sanitizeFormattedTerm(campos.competencias),
    bolsa: sanitizeUtil.sanitizeCurrency(campos.bolsa),
    cargaHoraria: sanitizeUtil.sanitizeTime(campos.cargaHoraria),
    modelo: sanitizeUtil.sanitizeTerm(campos.modelo),
    periodo: sanitizeUtil.sanitizeTerm(campos.periodo),
    transporte: sanitizeUtil.sanitizeCurrency(campos.transporte),
    alimentacao: sanitizeUtil.sanitizeCurrency(campos.alimentacao),
    idiomas: sanitizeUtil.sanitizeFormattedTerm(campos.idiomas),
    atividades: sanitizeUtil.sanitizeFormattedTerm(campos.atividades),
    informacoesExtras: sanitizeUtil.sanitizeFormattedTerm(campos.informacoesExtras)
  };
}

// Valida os campos obrigatórios do corpo da requisição.
function validarCamposObrigatorios(campos) {
  const obrigatorios = [
    'titulo', 'cargo', 'empresa', 'localizacao', 'cursos',
    'competencias', 'bolsa', 'cargaHoraria', 'modelo'
  ];
  return obrigatorios.every((campo) => campos[campo] !== undefined && campos[campo] !== null && campos[campo] !== '');
}

const getAll = asyncHandler(async (req, res) => {
  const vagas = await estagiosService.getAll();
  res.status(200).json(vagas);
});

const getVagaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vaga = await estagiosService.getVagaById(id);

  if (!vaga) throw new AppError(404, 'Vaga não encontrada.');

  res.status(200).json(vaga);
});

const getVagaByTerm = asyncHandler(async (req, res) => {
  const { termo } = req.query;

  if (!termo) throw new AppError(400, 'Informe o parâmetro "termo" para pesquisar.');

  const termoLimpo = sanitizeUtil.sanitizeTerm(termo);
  const vagasFiltradas = await estagiosService.getVagasByTerm(termoLimpo);

  res.status(200).json({ vagasFiltradas });
});

const createVaga = asyncHandler(async (req, res) => {
  const campos = req.body || {};

  if (!validarCamposObrigatorios(campos)) {
    throw new AppError(400, 'Campos obrigatórios ausentes.');
  }

  const dadosVaga = montarDadosVaga(campos);
  const novaVaga = await estagiosService.createVaga(dadosVaga);

  res.status(201).json({
    mensagem: 'Nova vaga criada com sucesso!',
    id: novaVaga._id,
    dados: novaVaga
  });
});

const updateVaga = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'ID inválido.');
  }
  if (Object.keys(updates).length === 0) {
    throw new AppError(400, 'Informe ao menos um campo para atualizar.');
  }

  const dadosAtualizados = {};
  if (updates.titulo) dadosAtualizados.titulo = sanitizeUtil.sanitizeTerm(updates.titulo);
  if (updates.cargo) dadosAtualizados.cargo = sanitizeUtil.sanitizeTerm(updates.cargo);
  if (updates.empresa) dadosAtualizados.empresa = sanitizeUtil.sanitizeTerm(updates.empresa);
  if (updates.localizacao) dadosAtualizados.localizacao = sanitizeUtil.sanitizeFormattedTerm(updates.localizacao);
  if (updates.cursos) dadosAtualizados.cursos = sanitizeUtil.sanitizeFormattedTerm(updates.cursos);
  if (updates.competencias) dadosAtualizados.competencias = sanitizeUtil.sanitizeFormattedTerm(updates.competencias);
  if (updates.bolsa) dadosAtualizados.bolsa = sanitizeUtil.sanitizeCurrency(updates.bolsa);
  if (updates.cargaHoraria) dadosAtualizados.cargaHoraria = sanitizeUtil.sanitizeTime(updates.cargaHoraria);
  if (updates.modelo) dadosAtualizados.modelo = sanitizeUtil.sanitizeTerm(updates.modelo);
  if (updates.periodo) dadosAtualizados.periodo = sanitizeUtil.sanitizeTerm(updates.periodo);
  if (updates.transporte) dadosAtualizados.transporte = sanitizeUtil.sanitizeCurrency(updates.transporte);
  if (updates.alimentacao) dadosAtualizados.alimentacao = sanitizeUtil.sanitizeCurrency(updates.alimentacao);
  if (updates.idiomas) dadosAtualizados.idiomas = sanitizeUtil.sanitizeFormattedTerm(updates.idiomas);
  if (updates.atividades) dadosAtualizados.atividades = sanitizeUtil.sanitizeFormattedTerm(updates.atividades);
  if (updates.informacoesExtras) dadosAtualizados.informacoesExtras = sanitizeUtil.sanitizeFormattedTerm(updates.informacoesExtras);

  const vagaAtualizada = await estagiosService.updateVaga(id, dadosAtualizados);

  if (!vagaAtualizada) throw new AppError(404, 'Vaga não encontrada.');

  res.status(200).json({
    mensagem: 'Vaga atualizada com sucesso!',
    dados: vagaAtualizada
  });
});

const deleteVaga = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vagaExcluida = await estagiosService.deleteVaga(id);

  if (!vagaExcluida) throw new AppError(404, 'Vaga não encontrada.');

  res.status(200).json({
    mensagem: 'Vaga excluída com sucesso!',
    dados: vagaExcluida
  });
});

export default {
  getAll,
  getVagaById,
  getVagaByTerm,
  createVaga,
  updateVaga,
  deleteVaga
};