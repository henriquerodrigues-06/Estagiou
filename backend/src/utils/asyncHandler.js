/**
 * Wrapper (envoltório) de funções assíncronas.
 * Evita repetir try/catch em todos os controllers: qualquer erro rejeitado
 * da Promise é encaminhado automaticamente para o middleware de erros (next).
 * A Promise é retornada para que o caller possa aguardar a conclusão.
 */
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;