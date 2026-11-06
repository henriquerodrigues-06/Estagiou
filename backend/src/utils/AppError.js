/**
 * Classe de erro personalizada usada para sinalizar erros "esperados"
 * (ex.: vaga não encontrada, dados inválidos) que devem ser retornados ao cliente
 * com o código HTTP adequado.
 */
export default class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}