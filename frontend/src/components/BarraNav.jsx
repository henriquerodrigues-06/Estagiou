import { Link, useLocation } from 'react-router-dom';
import { Home, FilePlus, User } from 'lucide-react';

export default function BarraNav() {
  const location = useLocation();

  const navStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: 'var(--branco)',
    borderTop: '1px solid var(--unicesusc-cinza)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px 0 20px 0',
    zIndex: 1000
  };

  const linkStyle = (path) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '10px',
    fontWeight: '600',
    color: location.pathname === path ? 'var(--unicesusc-bordo)' : 'var(--unicesusc-cinza)'
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle('/')}>
        <Home size={24} className="mb-1" />
        HOME
      </Link>
      <Link to="/cadastrar" style={linkStyle('/cadastrar')}>
        <FilePlus size={24} className="mb-1" />
        CADASTRAR
      </Link>
      <Link to="/perfil" style={linkStyle('/perfil')}>
        <User size={24} className="mb-1" />
        PERFIL
      </Link>
    </nav>
  );
}