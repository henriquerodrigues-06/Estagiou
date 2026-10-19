import { User, Mail, Hash, Phone } from 'lucide-react';

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
          
          <div className="mb-4">
            <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
              Nome Completo
            </label>
            <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
              <User size={18} color="var(--unicesusc-bordo)" />
              Henrique Pereira Rodrigues Nunes
            </div>
          </div>

          <div className="mb-4">
            <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
              E-mail
            </label>
            <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
              <Mail size={18} color="var(--unicesusc-bordo)" />
              henrique.nunes@unicesusc.edu.br
            </div>
          </div>

          <div className="mb-4">
            <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
              Matrícula
            </label>
            <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
              <Hash size={18} color="var(--unicesusc-bordo)" />
              202608453
            </div>
          </div>

          <div className="mb-4">
            <label className="text-uppercase mb-1" style={{ fontSize: '12px', color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
              Contato
            </label>
            <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', fontWeight: '500', color: '#111' }}>
              <Phone size={18} color="var(--unicesusc-bordo)" />
              (48) 98877-6655
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
