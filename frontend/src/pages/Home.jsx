import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { pesquisarVagas } from '../services/vagasService.js';

export default function Home() {
  const navigate = useNavigate();

  // O estado que guarda as vagas que estão aparecendo na tela começa vazio.
  const [vagasExibidas, setVagasExibidas] = useState([]);

  // Estado para controlar o que o usuário digita na barra de pesquisa.
  const [termoBusca, setTermoBusca] = useState('');

  // Função centralizada para carregar ou pesquisar as vagas. Se o termo for vazio (''), ela simplesmente devolve todas as vagas do localStorage.
  const carregarVagas = (termo = '') => {
    const resultados = pesquisarVagas(termo);
    setVagasExibidas(resultados);
  };

  // useEffect roda apenas UMA vez ao abrir a Home, carregando todas as vagas inicialmente.
  useEffect(() => {
    carregarVagas();
  }, []);

  // Manipulador para quando o usuário digita algo na barra de pesquisa
  const handlePesquisaChange = (e) => {
    const texto = e.target.value;
    setTermoBusca(texto); // Atualiza o que aparece escrito na tela.
    carregarVagas(texto); // Filtra a lista instantaneamente a cada letra digitada!
  };

  return (
    <div className="container mt-4 mb-5 pb-4">

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
      {/* Se não houver vagas ou a pesquisa não encontrar nada */}
      {vagasExibidas.length === 0 ? (
        <div className="text-center p-5 text-muted">
          <p>Nenhuma vaga encontrada.</p>
        </div>
      ) : (
        vagasExibidas.map((vaga) => (
          <div
            key={vaga.id}
            onClick={() => navigate(`/vaga/${vaga.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <Card vaga={vaga}
            // NÃO passamos showActions={true} aqui, então os botões de editar/excluir ficam escondidos.
            />
          </div>
        ))
      )}

    </div>
  );
}