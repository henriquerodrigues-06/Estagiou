const STORAGE_KEY = 'minhasVagas';

//Busca todas as vagas
export const listarVagas = () => {
    const vagas = localStorage.getItem(STORAGE_KEY);
    return vagas ? JSON.parse(vagas) : []
};

//Busca uma vaga pelo ID
export const buscarVagaPorId = (id) => {
    const vagas = listarVagas();

    return vagas.find(v => v.id === id);
};

//Busca vaga por termo/palavra-chave
export const pesquisarVagas = (termoBusca) => {
    const vagas = listarVagas();

    //Se o usuário limpar a barra de pesquisa, retorna a lista completa de vagas
    if (!termoBusca || termoBusca.trim() === '') {
        return vagas;
    }

    const termo = termoBusca.toLowerCase();
    
    //Filtra a lista e verifica se o termo existe no título, cargo ou empresa
    return vagas.filter(vaga =>
        vaga.titulo.toLowerCase().includes(termo) ||
        vaga.cargo.toLowerCase().includes(termo) ||
        vaga.empresa.toLowerCase().includes(termo)
    );
};

//Insere uma nova vaga ou altera uma vaga já existente
export const salvarVaga = (novaVaga) => {
    const vagas = listarVagas();
    
    //Se a vaga já tem um ID, então será atualizada, senão, será criada uma nova vaga
    if (novaVaga.id) {
        const index = vagas.findIndex(v => v.id === novaVaga.id);

        if (index !== -1) vagas[index] = novaVaga;
    } else {
        novaVaga.id = Date.now().toString(); //Gera um novo id para a vaga
        vagas.push(novaVaga); //Adiciona uma nova vaga ao fim da lista
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(vagas));
};

//Exclui uma vaga existente
export const excluirVaga = (id) => {
    const vagas = listarVagas();

    const vagasFiltradas = vagas.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vagasFiltradas))
};