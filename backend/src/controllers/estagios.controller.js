import estagiosService from "../services/estagios.service.js";
import sanitizeUtil from "../utils/sanitize.util.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Estagio:
 *       type: object
 *       required: [titulo, cargo, empresa, localizacao, cursos, competencias, bolsa, cargaHoraria, modelo]
 *       properties:
 *         titulo: { type: string, description: 'Título da vaga' }
 *         cargo: { type: string, description: 'Cargo oferecido' }
 *         empresa: { type: string, description: 'Empresa contratante' }
 *         localizacao: { type: string, description: 'Cidade/Estado' }
 *         cursos: { type: string, description: 'Cursos exigidos' }
 *         competencias: { type: string, description: 'Competências exigidas' }
 *         bolsa: { type: number, description: 'Valor da bolsa-auxílio' }
 *         cargaHoraria: { type: string, description: 'Carga horária' }
 *         modelo: { type: string, enum: ['Presencial', 'Híbrido', 'Remoto'] }
 *         periodo: { type: string, description: 'Período letivo (opcional)' }
 *         transporte: { type: number, description: 'Auxílio-transporte (opcional)' }
 *         alimentacao: { type: number, description: 'Vale-alimentação (opcional)' }
 *         idiomas: { type: string, description: 'Idiomas (opcional)' }
 *         atividades: { type: string, description: 'Atividades (opcional)' }
 *         informacoesExtras: { type: string, description: 'Informações extras (opcional)' }
 *     Erro:
 *       type: object
 *       properties:
 *         mensagem: { type: string, description: 'Mensagem do erro' }
 */

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

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Lista todas as vagas
 *     tags: [Vagas]
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estagio'
 */
const getAll = asyncHandler(async (req, res) => {
  const vagas = await estagiosService.getAll();
  res.status(200).json(vagas);
});
/**
 * @swagger
 * /vagas/listar/{id}:
 *   get:
 *     summary: Busca uma vaga pelo ID
 *     tags: [Vagas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vaga encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estagio'
 *       404:
 *         description: Vaga não encontrada
 */
const getVagaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vaga = await estagiosService.getVagaById(id);

  if (!vaga) throw new AppError(404, 'Vaga não encontrada.');

  res.status(200).json(vaga);
});

/**
 * @swagger
 * /vagas/listar/termo?termo={termo}:
 *   get:
 *     summary: Pesquisa vagas por termo (título, empresa ou cargo)
 *     tags: [Vagas]
 *     parameters:
 *       - in: query
 *         name: termo
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vagas encontradas
 */
const getVagaByTerm = asyncHandler(async (req, res) => {
  const { termo } = req.query;

  if (!termo) throw new AppError(400, 'Informe o parâmetro "termo" para pesquisar.');

  const termoLimpo = sanitizeUtil.sanitizeTerm(termo);
  const vagasFiltradas = await estagiosService.getVagasByTerm(termoLimpo);

  res.status(200).json({ vagasFiltradas });
});
/**
 * @swagger
 * /vagas/cadastrar:
 *   post:
 *     summary: Cadastra uma nova vaga
 *     tags: [Vagas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estagio'
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 */
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

/**
 * @swagger
 * /vagas/atualizar/{id}:
 *   patch:
 *     summary: Atualiza os dados de uma vaga
 *     tags: [Vagas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estagio'
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *       400:
 *         description: Nenhum campo informado
 *       404:
 *         description: Vaga não encontrada
 */
const updateVaga = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};

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

/**
 * @swagger
 * /vagas/deletar/{id}:
 *   delete:
 *     summary: Exclui uma vaga pelo ID
 *     tags: [Vagas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vaga excluída com sucesso
 *       404:
 *         description: Vaga não encontrada
 */
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