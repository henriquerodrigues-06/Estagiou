import Estagio from '../models/estagios.model.js';

// Busca todos os estagios cadastrados.
async function getAll() {
    return await Estagio.find().sort({ createdAt: -1 }); // O sort({ createdAt: -1 }) ordena para que as vagas mais recentes apareçam primeiro.
}

// Busca um estágio por ID.
async function getVagaById(id) {
    return await Estagio.findById(id);
}

// Busca estágios filtrando por palavras-chave.
async function getVagasByTerm(termoLimpo) {
    const regex = new RegExp(termoLimpo, 'i'); // A flag 'i' = "case-insensitive".

    // O Mongoose busca apenas os documentos que derem "match".
    return await Estagio.find({
        // $or instrui o banco: "Traga a vaga se o termo estiver NO TÍTULO, OU NA EMPRESA, OU NO CARGO".
        $or: [
            { titulo: { $regex: regex } },
            { empresa: { $regex: regex } },
            { cargo: { $regex: regex } }
        ]
    }).sort({ createdAt: -1 });
}

// Cadastra um novo estágio.
async function createVaga(dadosVaga) {
    const novaVaga = await Estagio.create(dadosVaga);
    return novaVaga;
}

// Atualiza os dados de um estágio existente.
async function updateVaga(id, dadosAtualizados) {
    return await Estagio.findByIdAndUpdate(id, dadosAtualizados, { new: true });
}

// Busca a vaga pelo ID e a remove permanentemente da coleção
async function deleteVaga(id) {
    return await Estagio.findByIdAndDelete(id);
}

export default {
    getAll,
    getVagaById,
    getVagasByTerm,
    createVaga,
    updateVaga,
    deleteVaga
};