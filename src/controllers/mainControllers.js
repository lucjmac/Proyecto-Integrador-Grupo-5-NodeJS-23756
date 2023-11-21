import path from "path";
import { sendRenderIndexShop } from "../helpers/sendRenderIndexShop.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
    constructor() {}

    homeGet(req, res) {
        const filePath = path.join(viewsPath, "index.html");
        sendRenderIndexShop(filePath, req, res);
    }

    contactGet(req, res) {
        const filePath = path.join(viewsPath, "shop", "contact.html");
        sendRenderIndexShop(filePath, req, res);
    }

    aboutGet(req, res) {
        res.send("Route for About View");
    }

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    }
}
