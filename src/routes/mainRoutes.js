import express from "express";
import { mainController } from "../controllers/mainControllers.js";

const router = express.Router();
const mainControllers = new mainController();

router
    .get("/home", mainControllers.homeGet)

    .get("/contact", mainControllers.contactGet)

    .get("/about", mainControllers.aboutGet)

    .get("/faqs", mainControllers.faqsGet);

export default router;


// app.get("/home", (req, res) => {
//     res.sendFile(path.join(root, "public", "index.html"));
// });