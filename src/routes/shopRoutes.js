import express from "express";
import { shopController } from "../controllers/shopControllers.js";

const router = express.Router();
const shopControllers = new shopController();

router
    .get("/shop", shopControllers.shopGet)

    .get("/shop/item/:id", shopControllers.itemIdGet)

    .post("/shop/item/:id/add", shopControllers.itemIdAddPost)

    .get("/shop/cart", shopControllers.shopCartGet)

    .post("/shop/cart", shopControllers.shopCartPost);

export default router;
