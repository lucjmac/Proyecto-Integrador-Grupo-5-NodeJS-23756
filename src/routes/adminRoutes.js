import express from "express";
import { adminController } from "../controllers/adminControllers.js";

const router = express.Router();
const adminControllers = new adminController();

router
    .get("/", adminControllers.adminGet)

    .get("/create", adminControllers.adminCreateGet)
    .post("/create", adminControllers.adminCreatePost)

    .get("/edit/:id", adminControllers.adminEditIdGet)
    .put("/edit/:id", adminControllers.adminEditIdPut)
    .delete("/edit/:id", adminControllers.adminEditIdDelete);

export default router;
