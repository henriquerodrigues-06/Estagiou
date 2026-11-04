const STORAGE_KEY = 'vagasEstagiou';

// Lista todas as vagas cadastradas.
export const listarVagas = () => {
  const vagasString = localStorage.getItem(STORAGE_KEY);
  return vagasString ? JSON.parse(vagasString) : [];
};

// Busca vaga pelo ID (índice dentro do localStorage).
export const buscarVagaPorId = (id) => {
  const vagas = listarVagas();
  return vagas.find(v => v.id === id);
};

// Pesquisa vagas por termo/parâmetro - Barra de pesquisa da Home.
export const pesquisarVagas = (termoBusca) => {
  const vagas = listarVagas();
  
  // Se o usuário limpar a barra de pesquisa, devolvemos a lista completa.
  if (!termoBusca || termoBusca.trim() === '') {
    return vagas;
  }
  const termo = termoBusca.toLowerCase();

  // Filtra a lista verificando se o termo existe no Título, na Empresa ou no Cargo.
  return vagas.filter(vaga => 
    vaga.titulo.toLowerCase().includes(termo) ||
    vaga.empresa.toLowerCase().includes(termo) ||
    vaga.cargo.toLowerCase().includes(termo)
  );
};

// Salva uma nova vaga ou Edita uma vaga já existente.
export const salvarVaga = (novaVaga) => {
  const vagas = listarVagas();
  
  if (novaVaga.id) {
    // Se a vaga já tiver um ID, edita a vaga existente.
    const index = vagas.findIndex(v => v.id === novaVaga.id);
    if (index !== -1) vagas[index] = novaVaga;
  } else {
    // Se não tiver ID, é uma vaga nova. Usamos Date.now() para gerar um ID único baseado nos milissegundos do relógio.
    novaVaga.id = Date.now().toString(); 
    vagas.push(novaVaga);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(vagas));
};

// Exclui uma vaga existente.
export const excluirVaga = (id) => {
  const vagas = listarVagas();
  // Filtram a lista, mantendo apenas as vagas que têm o ID DIFERENTE do que queremos apagar.
  const vagasFiltradas = vagas.filter(v => v.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vagasFiltradas));
};