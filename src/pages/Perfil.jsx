import { useState, useEffect } from 'react';
import { User, Mail, Hash, Phone, Pencil, Save, X } from 'lucide-react';

const STORAGE_KEY = 'perfilData';

const seedData = {
  nome: 'Henrique Pereira Rodrigues Nunes',
  email: 'henrique.nunes@unicesusc.edu.br',
  matricula: '202608453',
  contato: '(48) 98877-6655'
};

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);

  const [perfil, setPerfil] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : seedData;
    } catch {
      return seedData;
    }
  });

  const [formData, setFormData] = useState(perfil);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil));
  }, [perfil]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    if (!formData.matricula.trim()) newErrors.matricula = 'Matrícula é obrigatória';
    if (!formData.contato.trim()) newErrors.contato = 'Contato é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setFormData(perfil);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(perfil);
    setErrors({});
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPerfil({ ...formData });
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="container mt-4">
      <h2 className="font-title mb-4" style={{ color: 'var(--unicesusc-bordo)', fontSize: '24px' }}>
        Meu Perfil
      </h2>

      <div className="card shadow-sm border-0" style={{ borderRadius: '12px', outline: '1px solid var(--unicesusc-cinza)' }}>
        <div className="card-body p-4">

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <h6 className="mb-3" style={{ color: 'var(--unicesusc-bordo)' }}>Editar Dados</h6>

              <div className="mb-3">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                  style={errors.nome ? { borderColor: 'var(--unicesusc-vermelho)' } : {}}
                />
                {errors.nome && <small className="text-danger">{errors.nome}</small>}
              </div>

              <div className="mb-3">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  E-mail *
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seuemail@unicesusc.edu.br"
                  style={errors.email ? { borderColor: 'var(--unicesusc-vermelho)' } : {}}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="mb-3">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  Matrícula *
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleInputChange}
                  placeholder="Digite sua matrícula"
                  style={errors.matricula ? { borderColor: 'var(--unicesusc-vermelho)' } : {}}
                />
                {errors.matricula && <small className="text-danger">{errors.matricula}</small>}
              </div>

              <div className="mb-3">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  Contato *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="contato"
                  value={formData.contato}
                  onChange={handleInputChange}
                  placeholder="(XX) XXXXX-XXXX"
                  style={errors.contato ? { borderColor: 'var(--unicesusc-vermelho)' } : {}}
                />
                {errors.contato && <small className="text-danger">{errors.contato}</small>}
              </div>

              <div className="d-flex gap-2 pt-2">
                <button
                  type="submit"
                  className="btn flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                  style={{
                    backgroundColor: 'var(--unicesusc-bordo)',
                    color: 'var(--branco)',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  <Save size={18} />
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                  style={{
                    color: 'var(--unicesusc-chumbo)',
                    border: '1px solid var(--unicesusc-cinza)',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  <X size={18} />
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-4">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  Nome Completo
                </label>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
                  <User size={18} color="var(--unicesusc-bordo)" />
                  {perfil.nome}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  E-mail
                </label>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
                  <Mail size={18} color="var(--unicesusc-bordo)" />
                  {perfil.email}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  Matrícula
                </label>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
                  <Hash size={18} color="var(--unicesusc-bordo)" />
                  {perfil.matricula}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
                  Contato
                </label>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
                  <Phone size={18} color="var(--unicesusc-bordo)" />
                  {perfil.contato}
                </div>
              </div>

              <div className="pt-3 mt-2" style={{ borderTop: '1px solid var(--unicesusc-cinza)' }}>
                <button
                  onClick={handleEdit}
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                  style={{
                    color: 'var(--unicesusc-bordo)',
                    border: '1px solid var(--unicesusc-bordo)',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  <Pencil size={18} />
                  Editar Perfil
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
