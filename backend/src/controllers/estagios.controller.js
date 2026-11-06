import estagiosService from "../services/estagios.service.js";
import sanitizeUtil from "../utils/sanitize.util.js";

async function getAll(req, res) {
    try {
        const vagas = await estagiosService.getAll();

        res.status(200).json(vagas);
    } catch (error) {
        return res.status(500).end();
    }
}

async function getVagaById(req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).end();
        }

        const vaga = await estagiosService.getVagaById();

        res.status(200).json(vaga);

    } catch (error) {
        return res.status(500).end();
    }
}

async function getVagaByTerm(req, res) {
    try {
        const { termo } = req.query;

        if (!termo) {
            return res.status(400).end();
        }

        const termoLimpo = sanitizeUtil.sanitizeTerm(termo);

        const vagasFiltradas = await estagiosService.getVagasByTermo(termoLimpo);

        res.status(200).json({ vagasFiltradas });

    } catch (error) {
        return res.status(500).end();
    }
}

async function createVaga(req, res) {
    try {
        const {
            titulo,
            cargo,
            empresa,
            localizacao,
            cursos,
            competencias,
            bolsa,
            cargaHoraria,
            modelo,
            periodo,
            transporte,
            alimentacao,
            idiomas,
            atividades,
            informacoesExtras
        } = req.body;

        if (!titulo || !cargo || !empresa || !localizacao || !cursos ||
            !competencias || !bolsa || !cargaHoraria || !modelo) {

            return res.status(400).end();
        }

        const dadosVaga = {
            titulo: sanitizeUtil.sanitizeTerm(titulo),
            cargo: sanitizeUtil.sanitizeTerm(cargo),
            empresa: sanitizeUtil.sanitizeTerm(empresa),
            localizacao: sanitizeUtil.sanitizeFormattedTerm(localizacao),
            cursos: sanitizeUtil.sanitizeFormattedTerm(cursos),
            competencias: sanitizeUtil.sanitizeFormattedTerm(competencias),
            bolsa: sanitizeUtil.sanitizeCurrency(bolsa),
            cargaHoraria: sanitizeUtil.sanitizeTime(cargaHoraria),
            modelo: sanitizeUtil.sanitizeTerm(modelo),
            periodo: sanitizeUtil.sanitizeTerm(periodo),
            transporte: sanitizeUtil.sanitizeCurrency(transporte),
            alimentacao: sanitizeUtil.sanitizeCurrency(alimentacao),
            idiomas: sanitizeUtil.sanitizeFormattedTerm(idiomas),
            atividades: sanitizeUtil.sanitizeFormattedTerm(atividades),
            informacoesExtras: sanitizeUtil.sanitizeFormattedTerm(informacoesExtras)
        };

        const novaVaga = await estagiosService.createVaga(dadosVaga);

        res.status(201).json({
            mensagem: "Nova vaga criada com sucesso!",
            id: novaVaga._id,
            dados: novaVaga
        });
    } catch (error) {
        return res.status(500).end()
    }
}

async function updateVaga(req, res) {
    try {
        const id = req.params.id
        const updates = req.body;

        if (Object.keys(updates).length === 0) return res.status(400).end();

        const dadosAtualizados = {}

        if (updates.titulo) dadosAtualizados.titulo = sanitizeUtil.sanitizeTerm(updates.titulo);
        if (updates.cargo) dadosAtualizados.cargo = sanitizeUtil.sanitizeTerm(updates.cargo);
        if (updates.empresa) dadosAtualizados.empresa = sanitizeUtil.sanitizeTerm(updates.empresa);
        if (updates.localizacao) dadosAtualizados.localizacao = sanitizeUtil.sanitizeFormattedTerm(updates.localizacao);
        if (updates.cursos) dadosAtualizados.cursos = sanitizeUtil.sanitizeFormattedTerm(updates.cursos);
        if (updates.competencias) dadosAtualizados.competencias = sanitizeUtil.sanitizeFormattedTerm(updates.competencias);
        if (updates.bolsa) dadosAtualizados.bolsa = sanitizeUtil.sanitizeCurrency(updates.bolsa);
        if (updates.cargaHoraria) dadosAtualizados.cargaHoraria = sanitizeUtil.sanitizeTime(updates.cargaHoraria);
        if (updates.modelo) dadosAtualizados.modelo = sanitizeUtil.sanitizeTerm(updates.modelo);
        if (updates.periodo) dadosAtualizados.periodo = sanitizeUtil.sanitizeTerm(updates.periodo);
        if (updates.transporte) dadosAtualizados.transporte = sanitizeUtil.sanitizeCurrency(updates.transporte);
        if (updates.alimentacao) dadosAtualizados.alimentacao = sanitizeUtil.sanitizeCurrency(updates.alimentacao);
        if (updates.idiomas) dadosAtualizados.idiomas = sanitizeUtil.sanitizeFormattedTerm(updates.idiomas);
        if (updates.atividades) dadosAtualizados.atividades = sanitizeUtil.sanitizeFormattedTerm(updates.atividades);
        if (updates.informacoesExtras) dadosAtualizados.informacoesExtras = sanitizeUtil.sanitizeFormattedTerm(updates.informacoesExtras);

        const vagaAtualizada = await estagiosService.updateVaga(id, dadosAtualizados);

        if (!vagaAtualizada) return res.status(404).end();

        res.status(200).json({
            mensagem: "Vaga atualizada com sucesso!",
            dados: vagaAtualizada
        });
    } catch (error) {
        return res.status(500).end()
    }
}

async function deleteVaga(req, res) {
    try {
        const id = req.params.id

        const vagaExcluida = await estagiosService.deleteVaga(id);

        if (!vagaExcluida) return res.status(404).end();

        return res.status(200).json({
            mensagem: "Vaga excluída com sucesso!",
            dados: vagaExcluida
        });
    } catch (error) {
        return res.status(500).end();
    }
}

export default {
    getAll,
    getVagaById,
    getVagaByTerm,
    createVaga,
    updateVaga,
    deleteVaga
};