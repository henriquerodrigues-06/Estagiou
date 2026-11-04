import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Wallet, Clock, GraduationCap, CheckCircle, Calendar, Bus, Utensils, Languages } from 'lucide-react';
import { buscarVagaPorId } from '../services/vagasService.js';

export default function DetalhesVaga() {
  const { id } = useParams(); // Pega o ID da URL.
  const navigate = useNavigate();
  const [vaga, setVaga] = useState(null);
  const [candidatou, setCandidatou] = useState(false);

  useEffect(() => {
    const dados = buscarVagaPorId(id);
    if (dados) {
      setVaga(dados);
    } else {
      navigate('/'); // Se a vaga não existir ou for apagada, volta pra Home.
    }
  }, [id, navigate]);

  if (!vaga) return null;

  return (
    <div className="container mt-4 mb-5 pb-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-2 mb-4"
        style={{ color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <h2 className="font-title mb-1" style={{ color: 'var(--unicesusc-bordo)', fontSize: '28px' }}>
        {vaga.titulo}
      </h2>
      <h5 className="mb-4" style={{ color: 'var(--unicesusc-chumbo)', fontWeight: '600' }}>
        {vaga.empresa}
      </h5>

      <div className="card shadow-sm border-0 p-4 mb-4" style={{ borderRadius: '12px' }}>
        <h6 className="text-uppercase mb-3" style={{ color: 'var(--unicesusc-bordo)', fontWeight: '700', fontSize: '14px' }}>
          Visão Geral
        </h6>

        <div className="d-flex flex-column gap-3 mb-4" style={{ fontSize: '15px', color: '#333', fontWeight: '500' }}>
          <div className="d-flex align-items-center gap-3"><Briefcase size={18} color="var(--unicesusc-cinza)" /> {vaga.cargo}</div>
          <div className="d-flex align-items-center gap-3"><MapPin size={18} color="var(--unicesusc-cinza)" /> {vaga.localizacao} ({vaga.modelo})</div>
          <div className="d-flex align-items-center gap-3"><Clock size={18} color="var(--unicesusc-cinza)" /> {vaga.cargaHoraria}</div>
          <div className="d-flex align-items-center gap-3"><GraduationCap size={18} color="var(--unicesusc-cinza)" /> {vaga.cursos}</div>

          {vaga.periodo && (
            <div className="d-flex align-items-center gap-3"><Calendar size={18} color="var(--unicesusc-cinza)" /> {vaga.periodo}</div>
          )}

          <div className="d-flex align-items-center gap-3"><Wallet size={18} color="var(--unicesusc-cinza)" /> R$ {vaga.bolsa}</div>

          {vaga.transporte && (
            <div className="d-flex align-items-center gap-3"><Bus size={18} color="var(--unicesusc-cinza)" /> R$ {vaga.transporte}</div>
          )}
          {vaga.alimentacao && (
            <div className="d-flex align-items-center gap-3"><Utensils size={18} color="var(--unicesusc-cinza)" /> R$ {vaga.alimentacao}</div>
          )}
          {vaga.idiomas && (
            <div className="d-flex align-items-center gap-3"><Languages size={18} color="var(--unicesusc-cinza)" /> {vaga.idiomas}</div>
          )}
        </div>

        <h6 className="text-uppercase mb-2" style={{ color: 'var(--unicesusc-bordo)', fontWeight: '700', fontSize: '14px' }}>
          Competências Exigidas
        </h6>
        <ul style={{ fontSize: '14px', color: '#555', whiteSpace: 'pre-line' }}><li> {vaga.competencias} </li></ul>

        {(vaga.atividades || vaga.informacoesExtras) && (
          <>
            <h6 className="text-uppercase mb-2 mt-3" style={{ color: 'var(--unicesusc-bordo)', fontWeight: '700', fontSize: '14px' }}>
              Informações Adicionais
            </h6>
            <p style={{ fontSize: '14px', color: '#555', whiteSpace: 'pre-line' }}>
              {vaga.atividades}
              {vaga.atividades && vaga.informacoesExtras && '\n\n'}
              {vaga.informacoesExtras}
            </p>
          </>
        )}
      </div>

      <button
        onClick={() => setCandidatou(true)}
        disabled={candidatou}
        className="btn w-100 py-3 shadow-sm d-flex justify-content-center align-items-center gap-2"
        style={{
          backgroundColor: candidatou ? '#28a745' : 'var(--unicesusc-bordo)',
          color: 'var(--branco)',
          fontWeight: '700',
          fontSize: '18px',
          borderRadius: '8px',
          transition: '0.3s'
        }}
      >
        {candidatou ? <><CheckCircle size={22} /> Candidatura Enviada!</> : 'Candidatar-se'}
      </button>
    </div>
  );
}