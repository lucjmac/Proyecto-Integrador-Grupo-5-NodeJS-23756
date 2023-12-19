import express from "express";
import { adminController } from "../controllers/adminControllers.js";
import requireAuth from "../middleware/loginConfirm.js";

const router = express.Router();
const adminControllers = new adminController();

router
    .get("/", requireAuth, adminControllers.adminGet)

    .get("/create", requireAuth, adminControllers.adminCreateGet)
    .post("/create", requireAuth, adminControllers.adminCreatePost)

    .get("/edit/:id", requireAuth, adminControllers.adminEditIdGet)
    .put("/edit/:id", requireAuth, adminControllers.adminEditIdPut)

    .delete("/delete/:id", requireAuth, adminControllers.adminEditIdDelete);

export default router;
