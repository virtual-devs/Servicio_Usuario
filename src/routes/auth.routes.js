import { Router } from "express";
import { signUp, signIn, verifyTokenA } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/verifyA', verifyTokenA);

export default router;