import { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import Card from '../components/Card';

const STORAGE_KEY = 'minhasVagas';

const seedData = [
  {
    id: 3,
    titulo: 'Estagiário de Marketing',
    cargo: 'Assistente de Mídias',
    empresa: 'Agência Criativa',
    curso: 'Publicidade e Propaganda',
    bolsa: '1.000,00',
    modelo: 'Remoto'
  }
];

export default function Cadastrar() {
  // Controle de exibição do formulário
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Lista simulada (Mock) dos cadastros do próprio usuário
  // Carrega do localStorage na inicialização (lazy init), usa seedData se vazio
  const [minhasVagas, setMinhasVagas] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : seedData;
    } catch {
      return seedData;
    }
  });

   // Estado de formulário (novo ou edição)
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  // Estado do Formulário Controlado com todos os campos solicitados
  const [formData, setFormData] = useState({
    titulo: '', cargo: '', empresa: '', localizacao: '', cursos: '',
    competencias: '', bolsa: '', cargaHoraria: '', modelo: 'Presencial',
    periodo: '', transporte: '', alimentacao: '', idiomas: '', atividades: '', informacoesExtras: ''
  });

  const emptyForm = {
    titulo: '', cargo: '', empresa: '', localizacao: '', cursos: '',
    competencias: '', bolsa: '', cargaHoraria: '', modelo: 'Presencial',
    periodo: '', transporte: '', alimentacao: '', idiomas: '', atividades: '', informacoesExtras: ''
  };

  // Persiste no localStorage sempre que minhasVagas mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minhasVagas));
  }, [minhasVagas]);

  // Manipulador de eventos para os inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    ['titulo', 'cargo', 'empresa', 'localizacao', 'cursos', 'competencias', 'bolsa', 'cargaHoraria'].forEach(field => {
      if (!formData[field] || !formData[field].trim()) newErrors[field] = 'Campo obrigatório';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Cria uma nova vaga
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (editingId === null) {
      const novaVaga = { ...formData, id: Date.now() };
      setMinhasVagas([novaVaga, ...minhasVagas]);
    } else {
      setMinhasVagas(minhasVagas.map(v => (v.id === editingId ? { ...formData, id: editingId } : v)));
    }
    setFormData(emptyForm);
    setErrors({});
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Abre o formulário já preenchido com os dados da vaga (modo edição)
  const handleEdit = (id) => {
    const vaga = minhasVagas.find(v => v.id === id);
    if (vaga) {
      setFormData(vaga);
      setEditingId(id);
      setErrors({});
      setIsFormOpen(true);
    }
  };

  const handleDelete = (id) => {
    setMinhasVagas(minhasVagas.filter(vaga => vaga.id !== id));
  };

  return (
    <div className="container mt-4">
      {!isFormOpen ? (
        <>
          <h2 className="font-title mb-3" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
            Meus Cadastros
          </h2>
          
          {/* O parâmetro showActions={true} garante que Editar e Excluir apareçam apenas aqui */}
          {minhasVagas.map(vaga => (
            <Card 
              key={vaga.id} 
              vaga={vaga} 
              showActions={true}
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}

          {/* Botão Flutuante (FAB) Fixo na parte inferior */}
          <button 
            onClick={() => setIsFormOpen(true)}
            className="btn d-flex align-items-center justify-content-center gap-2 shadow-lg"
            style={{ 
              position: 'fixed', 
              bottom: '85px', /* Fica logo acima da BarraNav */
              left: '20px', 
              right: '20px', 
              width: 'calc(100% - 40px)', 
              backgroundColor: 'var(--unicesusc-bordo)', 
              color: 'var(--branco)',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: 'Bebas Neue',
              fontSize: '22px',
              letterSpacing: '1px',
              zIndex: 999
            }}
          >
            <PlusCircle size={24} />
            Cadastrar Estágio
          </button>
        </>
      ) : (
        <>
          {/* Cabeçalho do Formulário */}
          <div className="d-flex justify-content-between align-items-center mb-4">
             <h2 className="font-title m-0" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
              {editingId === null ? 'Nova Vaga' : 'Editar Vaga'}
            </h2>
            <button onClick={() => { setIsFormOpen(false); setEditingId(null); setFormData(emptyForm); setErrors({}); }} className="btn btn-link text-secondary p-0">
              <X size={28} />
            </button>
          </div>

          {/* Formulário Controlado */}
          <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4 mb-5" style={{ borderRadius: '12px' }}>
            
             <h6 className="mb-3" style={{ color: 'var(--unicesusc-bordo)' }}>Dados Obrigatórios</h6>
            <input type="text" className="form-control mb-1" name="titulo" value={formData.titulo} onChange={handleInputChange} placeholder="Título da Vaga *" required style={errors.titulo ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
            {errors.titulo && <small className="text-danger mb-2 d-block">{errors.titulo}</small>}
            <input type="text" className="form-control mb-1" name="cargo" value={formData.cargo} onChange={handleInputChange} placeholder="Cargo *" required style={errors.cargo ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
            {errors.cargo && <small className="text-danger mb-2 d-block">{errors.cargo}</small>}
            <input type="text" className="form-control mb-1" name="empresa" value={formData.empresa} onChange={handleInputChange} placeholder="Empresa *" required style={errors.empresa ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
            {errors.empresa && <small className="text-danger mb-2 d-block">{errors.empresa}</small>}
            <input type="text" className="form-control mb-1" name="localizacao" value={formData.localizacao} onChange={handleInputChange} placeholder="Localização (Cidade/Estado) *" required style={errors.localizacao ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
            {errors.localizacao && <small className="text-danger mb-2 d-block">{errors.localizacao}</small>}
            <input type="text" className="form-control mb-1" name="cursos" value={formData.cursos} onChange={handleInputChange} placeholder="Curso(s) exigido(s) *" required style={errors.cursos ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
            {errors.cursos && <small className="text-danger mb-2 d-block">{errors.cursos}</small>}
            <textarea className="form-control mb-1" name="competencias" value={formData.competencias} onChange={handleInputChange} placeholder="Competências (Hard e Soft Skills) *" required style={errors.competencias ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
            {errors.competencias && <small className="text-danger mb-2 d-block">{errors.competencias}</small>}
            
            <div className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" name="bolsa" value={formData.bolsa} onChange={handleInputChange} placeholder="Bolsa-auxílio *" required style={errors.bolsa ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
              <input type="text" className="form-control" name="cargaHoraria" value={formData.cargaHoraria} onChange={handleInputChange} placeholder="Carga horária *" required style={errors.cargaHoraria ? { borderColor: 'var(--unicesusc-vermelho)' } : {}} />
            </div>
            {errors.bolsa && <small className="text-danger mb-1 d-block">{errors.bolsa}</small>}
            {errors.cargaHoraria && <small className="text-danger mb-2 d-block">{errors.cargaHoraria}</small>}
            
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
            
            <button type="submit" className="btn w-100 py-3" style={{ backgroundColor: 'var(--unicesusc-bordo)', color: 'var(--branco)', fontWeight: '600', borderRadius: '8px' }}>
              Salvar Vaga
            </button>
          </form>
        </>
      )}
    </div>
  );
}
