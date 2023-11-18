import path from "path";
import fs from "fs";
import { renderHeaderIndexShop, renderFooterIndexShop } from "../services/headerFooter.js";

const root = path.resolve();

export class mainController {
    constructor() {}

    // homeGet(req, res) {
    //     res.sendFile(path.join(root, "src", "views", "index.html"));
    // };
    
    homeGet(req, res) {
        const indexFilePath = path.join(root, "src", "views", "index.html");
        const headerContent = renderHeaderIndexShop();
        const footerContent = renderFooterIndexShop();

        fs.readFile(indexFilePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error interno del servidor");
            };

            const content = headerContent + data + footerContent;
            res.send(content);
        });
    };
    

    // contactGet(req, res) {
    //     res.sendFile(path.join(root, "src", "views", "shop", "contact.html"));
    // };

    contactGet(req, res) {
        const indexFilePath = path.join(root, "src", "views", "shop", "contact.html");
        const headerContent = renderHeaderIndexShop();
        const footerContent = renderFooterIndexShop();

        fs.readFile(indexFilePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error interno del servidor");
            }

            const content = headerContent + data + footerContent;
            res.send(content);
        });
    };

    aboutGet(req, res) {
        res.send("Route for About View");
    };

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    };
}
