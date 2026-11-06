/**
 * Middleware chamado quando nenhuma rota corresponde à URL requisitada.
 * Retorna 404 com resposta JSON padronizada.
 */
const notFound = (req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
};

export default notFound;