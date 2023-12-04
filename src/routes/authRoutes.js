import express from "express";
import { authController } from "../controllers/authControllers.js";

const router = express.Router();
const authControllers = new authController();

router
    .get("/login", authControllers.authLoginGet)
    .post("/login", authControllers.authLoginPost)

    .get("/register", authControllers.authRegisterGet)
    .post("/register", authControllers.authRegisterPost)

    .get("/logout", authControllers.authLogoutGet);

export default router;
