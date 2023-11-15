import express from "express";
import { authController } from "../controllers/authControllers.js";

const router = express.Router();
const authControllers = new authController();

router.get("/auth/login", authControllers.authLoginGet);

router.post("/auth/login", authControllers.authLoginPost);

router.get("/auth/register", authControllers.authRegisterGet);

router.post("/auth/register", authControllers.authRegisterPost);

router.get("/auth/logout", authControllers.authLogoutGet);

export default router;
