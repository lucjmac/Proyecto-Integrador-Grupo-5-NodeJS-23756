import express from "express";
import { adminController } from "../controllers/adminControllers.js";
import { productFilterAdminSearch } from "../middlewares/productFilterAdminSearch.js"; 

const router = express.Router();
const adminControllers = new adminController();

router
    .get("/", productFilterAdminSearch, adminControllers.adminGet)

    .get("/create", adminControllers.adminCreateGet)
    .post("/create", adminControllers.adminCreatePost)

    .get("/edit/:code", adminControllers.adminEditIdGet)
    .put("/edit/:code", adminControllers.adminEditIdPut)
    .delete("/edit/:code", adminControllers.adminEditIdDelete);

export default router;
