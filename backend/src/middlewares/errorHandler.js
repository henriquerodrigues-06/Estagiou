import AppError from '../utils/AppError.js';

/**
 * Middleware central de tratamento de exceções.
 * Todo erro da aplicação passa por aqui e ganha uma resposta JSON padronizada.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Erros operacionais criados por nós (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ mensagem: err.message });
  }

  // ID de vaga malformado (ex.: MongoDB 'CastError')
  if (err.name === 'CastError') {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  // Falha na validação do Schema do Mongoose
  if (err.name === 'ValidationError') {
    const detalhes = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ mensagem: 'Dados inválidos.', detalhes });
  }

  // Qualquer outro erro inesperado
  console.error('Erro inesperado:', err);
  return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
};

export default errorHandler;