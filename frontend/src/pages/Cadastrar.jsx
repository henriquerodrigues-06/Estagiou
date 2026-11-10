import { useState, useEffect } from 'react';
import { PlusCircle, X, Loader2 } from 'lucide-react';
import Card from '../components/Card.jsx';
import { salvarVaga, listarVagas, excluirVaga } from '../services/vagasService.js';

export default function Cadastrar() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  const estadoInicialFormulario = {
    titulo: '', cargo: '', empresa: '', localizacao: '', cursos: '',
    competencias: '', bolsa: '', cargaHoraria: '', modelo: 'Presencial',
    periodo: '', transporte: '', alimentacao: '', idiomas: '', atividades: '', informacoesExtras: ''
  };

  const [formData, setFormData] = useState(estadoInicialFormulario);

  const carregarVagas = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const vagasSalvas = await listarVagas();
      setMinhasVagas(vagasSalvas);
    } catch (err) {
      console.error("Erro ao carregar vagas:", err);
      setErro("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarVagas();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setEnviando(true);
      await salvarVaga(formData);
      await carregarVagas();
      setFormData(estadoInicialFormulario);
      setIsFormOpen(false);
    } catch (err) {
      console.error("Erro ao salvar vaga:", err.response?.data || err.message);
      alert("Erro ao guardar a vaga. Verifique se todos os campos obrigatórios foram preenchidos corretamente.");
    } finally {
      setEnviando(false);
    }
  };

  const handleEdit = (id) => {
    const vagaParaEditar = minhasVagas.find(v => v.id === id);
    if (vagaParaEditar) {
      setFormData(vagaParaEditar);
      setIsFormOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta vaga?")) {
      try {
        await excluirVaga(id);
        await carregarVagas();
      } catch (err) {
        console.error("Erro ao excluir vaga:", err);
        alert("Não foi possível excluir a vaga.");
      }
    }
  };

  return (
    <div className="container mt-4 mb-5 pb-4">
      {!isFormOpen ? (
        <>
          <h2 className="font-title mb-3" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
            Meus Cadastros
          </h2>

          {carregando ? (
            <div className="text-center p-5">
              <Loader2 className="spinner-border text-danger" style={{ width: '2rem', height: '2rem' }} />
              <p className="text-muted mt-2">Carregando os seus cadastros...</p>
            </div>
          ) : erro ? (
            <div className="alert alert-danger text-center">{erro}</div>
          ) : minhasVagas.length === 0 ? (
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
            <button
              onClick={() => { setIsFormOpen(false); setFormData(estadoInicialFormulario); }}
              className="btn btn-link text-secondary p-0"
              disabled={enviando}
            >
              <X size={28} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4 mb-5" style={{ borderRadius: '12px' }}>
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

            <h6 className="mb-3 mt-2" style={{ color: 'var(--unicesusc-bordo)' }}>Informações Opcionais</h6>
            <input type="text" className="form-control mb-2" name="periodo" value={formData.periodo} onChange={handleInputChange} placeholder="Período letivo" />

            <div className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" name="transporte" value={formData.transporte} onChange={handleInputChange} placeholder="Auxílio-transporte" />
              <input type="text" className="form-control" name="alimentacao" value={formData.alimentacao} onChange={handleInputChange} placeholder="Vale-alimentação" />
            </div>

            <input type="text" className="form-control mb-2" name="idiomas" value={formData.idiomas} onChange={handleInputChange} placeholder="Idiomas (Nível)" />
            <textarea className="form-control mb-2" name="atividades" value={formData.atividades} onChange={handleInputChange} placeholder="Atividades a serem exercidas" />
            <textarea className="form-control mb-4" name="informacoesExtras" value={formData.informacoesExtras} onChange={handleInputChange} placeholder="Demais informações relevantes..." rows="3" />

            <button
              type="submit"
              disabled={enviando}
              className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: 'var(--unicesusc-bordo)', color: 'var(--branco)', fontWeight: '600', borderRadius: '8px' }}
            >
              {enviando ? <Loader2 className="spinner-border spinner-border-sm" /> : 'Salvar Vaga'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}