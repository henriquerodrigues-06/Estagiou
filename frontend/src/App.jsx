import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import BarraNav from './components/BarraNav';
import Home from './pages/Home';
import Cadastrar from './pages/Cadastrar';
import Perfil from './pages/Perfil';
import DetalhesVaga from './pages/DetalhesVaga';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/vaga/:id" element={<DetalhesVaga />} />
        <Route path="*" element={
          <div className="container mt-5 text-center">
            <h2 className="font-title mb-3" style={{ color: 'var(--unicesusc-bordo)', fontSize: '28px' }}>
              Página não encontrada
            </h2>
            <p className="text-muted mb-4">A página que você procura não existe ou foi removida.</p>
            <Link to="/" className="btn px-4" style={{ backgroundColor: 'var(--unicesusc-bordo)', color: 'var(--branco)', borderRadius: '8px', fontWeight: '600' }}>
              Voltar ao início
            </Link>
          </div>
        } />
      </Routes>
      <BarraNav />
    </BrowserRouter>
  );
}