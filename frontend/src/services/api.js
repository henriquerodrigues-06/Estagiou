import axios from 'axios';

// Cria uma instância do Axios com configurações globais da nossa aplicação
const api = axios.create({
  baseURL: 'http://localhost:3000', // Endereço onde o backend está rodando
  timeout: 10000, 
});

export default api;