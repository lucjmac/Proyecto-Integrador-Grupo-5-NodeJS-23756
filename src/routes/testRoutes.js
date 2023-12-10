import express from "express";
import { testController } from "../controllers/testControllers.js";

const router = express.Router();
const testControllers = new testController();

router
    .get("/consulta/:tabla", testControllers.consulta)
    .get("/insertar/:valor", testControllers.insertTest);

export default router;
