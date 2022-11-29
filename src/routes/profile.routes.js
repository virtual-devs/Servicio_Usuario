import { Router } from "express";
import { getUsuarios, getUsuarioOne, createPerfil, updatePerfil, deletePerfil } from "../controllers/profile.controller.js";

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/perfil/:id', getUsuarioOne);
router.post('/usuarioAdd', createPerfil);
router.put('/usuarioUpdate/:id', updatePerfil);
router.delete('/usuarioRemove', deletePerfil);

export default router;