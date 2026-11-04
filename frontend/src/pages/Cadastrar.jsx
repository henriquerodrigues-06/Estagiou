import { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import Card from '../components/Card.jsx';
import { salvarVaga, listarVagas, excluirVaga } from '../services/vagasService.js';

export default function Cadastrar() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // O estado agora começa vazio, pois vamos buscar os dados do navegador.
  const [minhasVagas, setMinhasVagas] = useState([]);

  // Estado inicial do formulário (limpo) salvo em uma variável para podermos reutilizar.
  const estadoInicialFormulario = {
    titulo: '', cargo: '', empresa: '', localizacao: '', cursos: '',
    competencias: '', bolsa: '', cargaHoraria: '', modelo: 'Presencial',
    periodo: '', transporte: '', alimentacao: '', idiomas: '', atividades: '', informacoesExtras: ''
  };

  const [formData, setFormData] = useState(estadoInicialFormulario);

  // Carrega os dados assim que a tela abre.
  const carregarVagas = () => {
    const vagasSalvas = listarVagas();
    setMinhasVagas(vagasSalvas);
  };

  // O useEffect roda a função carregarVagas() uma única vez quando o componente é montado na tela.
  useEffect(() => {
    carregarVagas();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Evento disparado ao clicar em "Salvar Vaga".
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede a página de recarregar.

    salvarVaga(formData);
    carregarVagas();

    setFormData(estadoInicialFormulario);
    setIsFormOpen(false);
  };

  // Evento para editar uma vaga.
  const handleEdit = (id) => {
    const vagaParaEditar = minhasVagas.find(v => v.id === id);
    if (vagaParaEditar) {
      setFormData(vagaParaEditar);
      setIsFormOpen(true);
    }
  };

  // Evento para excluir uma vaga.
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta vaga?")) {
      excluirVaga(id);
      carregarVagas();
    }
  };

  return (
    <div className="container mt-4 mb-5 pb-4">
      {!isFormOpen ? (
        <>
          <h2 className="font-title mb-3" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
            Meus Cadastros
          </h2>

          {minhasVagas.length === 0 ? (
            <div className="text-center p-5 text-muted">
              <p>Você ainda não cadastrou nenhuma vaga.</p>
            </div>
          ) : (
            minhasVagas.map(vaga => (
              <Card
                key={vaga.id}
                vaga={vaga}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}

          <button
            onClick={() => setIsFormOpen(true)}
            className="btn d-flex align-items-center justify-content-center gap-2 shadow-lg"
            style={{
              position: 'fixed', bottom: '85px', left: '20px', right: '20px',
              width: 'calc(100% - 40px)', backgroundColor: 'var(--unicesusc-bordo)',
              color: 'var(--branco)', borderRadius: '8px', padding: '16px',
              fontFamily: 'Bebas Neue', fontSize: '22px', letterSpacing: '1px', zIndex: 999
            }}
          >
            <PlusCircle size={24} />
            Cadastrar Estágio
          </button>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="font-title m-0" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
              {formData.id ? 'Editar Vaga' : 'Nova Vaga'}
            </h2>
            <button onClick={() => { setIsFormOpen(false); setFormData(estadoInicialFormulario); }} className="btn btn-link text-secondary p-0">
              <X size={28} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4 mb-5" style={{ borderRadius: '12px' }}>

            {/* Campos Obrigatórios */}
            <h6 className="mb-3" style={{ color: 'var(--unicesusc-bordo)' }}>Dados Obrigatórios</h6>
            <input type="text" className="form-control mb-2" name="titulo" value={formData.titulo} onChange={handleInputChange} placeholder="Título da Vaga *" required />
            <input type="text" className="form-control mb-2" name="cargo" value={formData.cargo} onChange={handleInputChange} placeholder="Cargo *" required />
            <input type="text" className="form-control mb-2" name="empresa" value={formData.empresa} onChange={handleInputChange} placeholder="Empresa *" required />
            <input type="text" className="form-control mb-2" name="localizacao" value={formData.localizacao} onChange={handleInputChange} placeholder="Localização (Cidade/Estado) *" required />
            <input type="text" className="form-control mb-2" name="cursos" value={formData.cursos} onChange={handleInputChange} placeholder="Curso(s) exigido(s) *" required />
            <textarea className="form-control mb-2" name="competencias" value={formData.competencias} onChange={handleInputChange} placeholder="Competências (Hard e Soft Skills) *" required />

            <div className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" name="bolsa" value={formData.bolsa} onChange={handleInputChange} placeholder="Bolsa-auxílio *" required />
              <input type="text" className="form-control" name="cargaHoraria" value={formData.cargaHoraria} onChange={handleInputChange} placeholder="Carga horária *" required />
            </div>

            <select className="form-select mb-4" name="modelo" value={formData.modelo} onChange={handleInputChange} required>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">Remoto</option>
            </select>
            
            {/* Campos Opcionais */}
            <h6 className="mb-3 mt-2" style={{ color: 'var(--unicesusc-bordo)' }}>Informações Opcionais</h6>
            <input type="text" className="form-control mb-2" name="periodo" value={formData.periodo} onChange={handleInputChange} placeholder="Período letivo" />

            <div className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" name="transporte" value={formData.transporte} onChange={handleInputChange} placeholder="Auxílio-transporte" />
              <input type="text" className="form-control" name="alimentacao" value={formData.alimentacao} onChange={handleInputChange} placeholder="Vale-alimentação" />
            </div>

            <input type="text" className="form-control mb-2" name="idiomas" value={formData.idiomas} onChange={handleInputChange} placeholder="Idiomas (Nível)" />
            <textarea className="form-control mb-2" name="atividades" value={formData.atividades} onChange={handleInputChange} placeholder="Atividades a serem exercidas" />
            <textarea className="form-control mb-4" name="informacoesExtras" value={formData.informacoesExtras} onChange={handleInputChange} placeholder="Demais informações relevantes..." rows="3" />

            <button type="submit" className="btn w-100 py-3" style={{ backgroundColor: 'var(--unicesusc-bordo)', color: 'var(--branco)', fontWeight: '600', borderRadius: '8px' }}>
              Salvar Vaga
            </button>
          </form>
        </>
      )}
    </div>
  );
}