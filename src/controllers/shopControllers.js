import path from "path";
import fs from "fs";
import { renderPage } from "../services/headerFooter.js";

const viewsPath = path.resolve() + "/src/views/shop";

export class shopController {
    constructor() {}

    shopGet(req, res) {
        const filePath = path.join(viewsPath, "shop.html");
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

    itemIdGet(req, res) {
        const filePath = path.join(viewsPath, "item.html");
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

    itemIdAddPost(req, res) {
        res.send("Route for add the current item to the shop cart ");
    }

    shopCartGet(req, res) {
        const filePath = path.join(viewsPath, "cart.html");
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

    shopCartPost(req, res) {
        res.send("Route for go to checkout page");
    }
}
