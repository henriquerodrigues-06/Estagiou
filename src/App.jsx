import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      </Routes>
      <BarraNav />
    </BrowserRouter>
  );
}