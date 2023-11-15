import express from "express";
import { mainController } from "../controllers/mainControllers.js";

const router = express.Router();
const mainControllers = new mainController();

router.get("/home", mainControllers.homeGet);

router.get("/contact", mainControllers.contactGet);

router.get("/about", mainControllers.aboutGet);

router.get("/faqs", mainControllers.faqsGet);

export default router;
