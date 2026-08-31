import { GraduationCap, Wallet, MapPin, Pencil, Trash2, Briefcase } from 'lucide-react';

export default function Card({ vaga, onEdit, onDelete, showActions = false }) {
    return (
        <div className="card mb-3 shadow-sm border-0" style={{ borderRadius: '12px', outline: '1px solid var(--unicesusc-cinza)' }}>
            <div className="card-body p-3">
                <h5 className="card-title mb-1" style={{ color: 'var(--unicesusc-bordo)', fontWeight: '700', fontSize: '16px' }}>
                    {vaga.titulo}
                </h5>

                <h6 className="card-subtitle mb-3 d-flex align-items-center gap-1" style={{ color: 'var(--unicesusc-chumbo)', fontWeight: '600', fontSize: '14px' }}>
                    <Briefcase size={14} />
                    {vaga.cargo} - {vaga.empresa}
                </h6>

                <div className="d-flex flex-column gap-2" style={{ fontSize: '12px', color: '#666' }}>
                    <div className="d-flex align-items-center gap-2">
                        <GraduationCap size={14} />
                        <span>{vaga.curso}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <Wallet size={14} />
                        <span>R$ {vaga.bolsa}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <MapPin size={14} />
                        <span>{vaga.modelo}</span>
                    </div>
                </div>

                {showActions && (
                    <div className="d-flex gap-4 mt-3 pt-3" style={{ borderTop: '1px solid var(--unicesusc-cinza)' }}>
                        <button onClick={() => onEdit(vaga.id)} className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1" style={{ color: 'var(--unicesusc-chumbo)', fontSize: '12px', fontWeight: '600' }}>
                            <Pencil size={16} /> Editar
                        </button>
                        <button onClick={() => onDelete(vaga.id)} className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1" style={{ color: 'var(--unicesusc-vermelho)', fontSize: '12px', fontWeight: '600' }}>
                            <Trash2 size={16} /> Excluir
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}