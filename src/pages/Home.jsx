import { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../components/Card';

export default function Home() {
  // Estado inicial simulando os dados cadastrados
  const [vagas, setVagas] = useState([
    {
      id: 1,
      titulo: 'Estagiário de Front-End',
      cargo: 'Desenvolvedor Junior',
      empresa: 'Tech Solutions S/A',
      curso: 'Sistemas de Informação',
      bolsa: '1.200,00',
      modelo: 'Híbrido'
    },
    {
      id: 2,
      titulo: 'Estágio em Administração',
      cargo: 'Assistente Administrativo',
      empresa: 'Consultoria Financeira',
      curso: 'Administração',
      bolsa: '950,00',
      modelo: 'Presencial'
    }
  ]);

  return (
    <div className="container mt-4">
      
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
        />
      </div>

      <h2 className="font-title mb-3" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
        Vagas Recentes
      </h2>

      {/* Renderização Dinâmica dos Cards */}
      {vagas.map((vaga) => (
        <Card 
          key={vaga.id} 
          vaga={vaga} 
          onEdit={(id) => console.log('Editar vaga', id)}
          onDelete={(id) => console.log('Excluir vaga', id)}
        />
      ))}
      
    </div>
  );
}