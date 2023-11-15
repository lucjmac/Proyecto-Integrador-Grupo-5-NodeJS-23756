import express from "express";
import { shopController } from "../controllers/shopControllers.js";

const router = express.Router();
const shopControllers = new shopController();

router.get("/shop", shopControllers.shopGet);

router.get("/shop/item/:id", shopControllers.itemIdGet);

router.post("/shop/item/:id/add", shopControllers.itemIdAddPost);

router.get("/shop/cart", shopControllers.shopCartGet);

router.post("/shop/cart", shopControllers.shopCartPost);

export default router;
