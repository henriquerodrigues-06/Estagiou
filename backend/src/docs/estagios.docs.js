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