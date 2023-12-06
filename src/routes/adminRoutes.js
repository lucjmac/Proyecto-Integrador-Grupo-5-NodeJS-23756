import express from "express";
import { adminController } from "../controllers/adminControllers.js";

const router = express.Router();
const adminControllers = new adminController();

router
    .get("/", adminControllers.adminGet)

    .get("/create", adminControllers.adminCreateGet)
    .post("/create", adminControllers.adminCreatePost)

    .get("/edit/:productId/:productName/:productCode/:productCollection", adminControllers.adminEditIdGet)
    .put("/edit/:productId/:productName/:productCode/:productCollection", adminControllers.adminEditIdPut)
    .delete("/edit/:productId/:productName/:productCode/:productCollection", adminControllers.adminEditIdDelete);

export default router;
