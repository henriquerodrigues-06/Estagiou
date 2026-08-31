import { User, Mail, Hash, Phone, Pencil } from 'lucide-react';

export default function Perfil() {
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

          <div className="pt-3 mt-2" style={{ borderTop: '1px solid var(--unicesusc-cinza)' }}>
            <button className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2" style={{ color: 'var(--unicesusc-bordo)', border: '1px solid var(--unicesusc-bordo)', borderRadius: '8px', fontWeight: '600' }}>
              <Pencil size={18} />
              Editar Perfil
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}