import express from "express";
import { mainController } from "../controllers/mainControllers.js";

const router = express.Router();
const mainControllers = new mainController();

router
    .get("/", mainControllers.homeGet)

    .get("/contact", mainControllers.contactGet)

    .get("/about", mainControllers.aboutGet)

    .get("/faqs", mainControllers.faqsGet);

export default router;
