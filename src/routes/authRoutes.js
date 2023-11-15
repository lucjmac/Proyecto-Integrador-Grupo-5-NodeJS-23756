import express from "express";
import { authController } from "../controllers/authControllers.js";

const router = express.Router();
const authControllers = new authController();

router
    .get("/auth/login", authControllers.authLoginGet)

    .post("/auth/login", authControllers.authLoginPost)

    .get("/auth/register", authControllers.authRegisterGet)

    .post("/auth/register", authControllers.authRegisterPost)

    .get("/auth/logout", authControllers.authLogoutGet);

export default router;
