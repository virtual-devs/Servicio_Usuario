import { Router } from "express";
import { signUp, signIn, verifyTokenA, verifyTokenV } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/verifyA', verifyTokenA);
router.post('/verifyV', verifyTokenV);

export default router;