import express from "express";
import { adminController } from "../controllers/adminControllers.js";

const router = express.Router();
const adminControllers = new adminController();

router
    .get("/admin", adminControllers.adminGet)
    .get("/admin/create", adminControllers.adminCreateGet)
    .post("/admin/create", adminControllers.adminCreatePost)
    .get("/admin/edit/:id", adminControllers.adminEditIdGet)
    .put("/admin/edit/:id", adminControllers.adminEditIdPut)
    .delete("/admin/edit/:id", adminControllers.adminEditIdDelete);

export default router;
