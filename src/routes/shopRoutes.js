import express from "express";
import { shopController } from "../controllers/shopControllers.js";

const router = express.Router();
const shopControllers = new shopController();

router
    .get("/", shopControllers.shopGet)
    .get("/cart", shopControllers.shopCartGet)
    .get("/item/:id", shopControllers.itemIdGet);

    /*
    .post("/item/:id/add", shopControllers.itemIdAddPost)
    .post("/cart", shopControllers.shopCartPost);*/
    

export default router;
