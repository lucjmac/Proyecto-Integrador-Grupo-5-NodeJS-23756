import express from "express";
import { adminController } from "../controllers/adminControllers.js";

const router = express.Router();
const adminControllers = new adminController();

router.get("/admin", adminControllers.adminGet);

router.get("/admin/create", adminControllers.adminCreateGet);

router.post("/admin/create", adminControllers.adminCreatePost);

router.get("/admin/edit/:id", adminControllers.adminEditIdGet);

router.put("/admin/edit/:id", adminControllers.adminEditIdPut);

router.delete("/admin/edit/:id", adminControllers.adminEditIdDelete);

export default router;
