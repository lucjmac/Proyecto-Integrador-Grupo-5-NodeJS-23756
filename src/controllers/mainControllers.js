import path from "path";
import fs from "fs";
import { renderPage } from "../services/headerFooter.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
    constructor() {}

    homeGet(req, res) {
        const filePath = path.join(viewsPath, "index.html");
        const headerContent = renderPage("headerIndexShop");
        const footerContent = renderPage("footerIndexShop");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error interno del servidor");
            }

            const content = headerContent + data + footerContent;
            res.send(content);
        });
    }

    contactGet(req, res) {
        const filePath = path.join(viewsPath, "shop", "contact.html");
        const headerContent = renderPage("headerIndexShop");
        const footerContent = renderPage("footerIndexShop");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error interno del servidor");
            }

            const content = headerContent + data + footerContent;
            res.send(content);
        });
    }

    aboutGet(req, res) {
        res.send("Route for About View");
    }

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    }
}
