import { Router } from "express";
import estagiosController from "../controllers/estagios.controller.js";

const router = Router();

router.get('/', estagiosController.getAll);

router.get('/listar/:id', estagiosController.getVagaById);

router.get('/listar/termo', estagiosController.getVagaByTerm);

router.post('/cadastrar', estagiosController.createVaga);

router.patch('/atualizar/:id', estagiosController.updateVaga);

router.delete('/deletar/:id', estagiosController.deleteVaga);

export default router;