import express from "express";
import { adminController } from "../controllers/adminControllers.js";

const router = express.Router();
const adminControllers = new adminController();

router
  .get("/", adminControllers.adminGet)
  .get("/products", adminControllers.adminGetAllProducts)

  .get("/create", adminControllers.adminCreateGet)
  .post("/create", adminControllers.adminCreatePost)

  .get("/edit/:id", adminControllers.adminEditIdGet)
  .put("/edit/:id", adminControllers.adminEditIdPut)
  .delete("/delete/:id", adminControllers.adminEditIdDelete);

export default router;
