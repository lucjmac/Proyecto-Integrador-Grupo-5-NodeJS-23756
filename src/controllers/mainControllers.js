import path from "path";
import { renderIndexShop } from "../Services/renderPage.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
    constructor() {}

    homeGet(req, res) {
        const filePath = path.join(viewsPath, "index.html");
        renderIndexShop(filePath, req, res);
    }

    contactGet(req, res) {
        const filePath = path.join(viewsPath, "shop", "contact.html");
        renderIndexShop(filePath, req, res);
    }

    aboutGet(req, res) {
        res.send("Route for About View");
    }

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    }
}
