import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { pesquisarVagas } from '../services/vagasService.js';

export default function Home() {
  const navigate = useNavigate();

  const [vagasExibidas, setVagasExibidas] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função assíncrona para buscar as vagas na API através do serviço
  const carregarVagas = async (termo = '') => {
    try {
      setCarregando(true);
      setErro(null);
      const resultados = await pesquisarVagas(termo);
      setVagasExibidas(resultados);
    } catch (err) {
      console.error("Erro ao carregar vagas:", err);
      setErro("Não foi possível conectar ao servidor. Verifique se o backend está rodando normalmente.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarVagas();
  }, []);

  const handlePesquisaChange = (e) => {
    const texto = e.target.value;
    setTermoBusca(texto);
    carregarVagas(texto);
  };

  return (
    <div className="container mt-4 mb-5 pb-4">
      {/* Barra de Pesquisa */}
      <div className="input-group mb-4 shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <span className="input-group-text bg-white border-end-0" style={{ borderColor: 'var(--unicesusc-cinza)' }}>
          <Search size={18} color="var(--unicesusc-chumbo)" />
        </span>
        <input
          type="text"
          className="form-control border-start-0 ps-0"
          placeholder="Buscar vagas ou empresas..."
          style={{ borderColor: 'var(--unicesusc-cinza)', boxShadow: 'none' }}
          value={termoBusca}
          onChange={handlePesquisaChange}
        />
      </div>

      <h2 className="font-title mb-3" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
        Vagas Recentes
      </h2>

      {/* Indicador de Carregamento (Spinner) */}
      {carregando && (
        <div className="text-center p-5">
          <Loader2 className="spinner-border text-danger" style={{ width: '2rem', height: '2rem' }} />
          <p className="text-muted mt-2">Carregando vagas...</p>
        </div>
      )}

      {/* Mensagem de Erro de Conexão */}
      {!carregando && erro && (
        <div className="alert alert-danger text-center role='alert'">
          {erro}
        </div>
      )}

      {/* Lista de Vagas ou Estado Vazio */}
      {!carregando && !erro && vagasExibidas.length === 0 ? (
        <div className="text-center p-5 text-muted">
          <p>Nenhuma vaga encontrada.</p>
        </div>
      ) : (
        !carregando && !erro && vagasExibidas.map((vaga) => (
          <div
            key={vaga.id}
            onClick={() => navigate(`/vaga/${vaga.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <Card vaga={vaga} />
          </div>
        ))
      )}
    </div>
  );
}