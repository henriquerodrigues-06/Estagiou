import logo from '../assets/Simbolo-Branco.png';

export default function Header() {
  return (
    <header 
      className="d-flex align-items-center justify-content-center py-3 shadow-sm" 
      style={{ backgroundColor: 'var(--unicesusc-bordo)', color: 'var(--branco)' }}
    >
      <img src={logo} alt="Símbolo Unicesusc" style={{ height: '24px', marginRight: '12px' }} />
      <h1 className="m-0 font-title" style={{ fontSize: '28px', paddingTop: '4px' }}>Estagiou</h1>
    </header>
  );
}