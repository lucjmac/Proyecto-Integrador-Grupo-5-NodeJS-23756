import fs from "fs";
import { renderPage } from "../helpers/headerFooter.js";

export const sendRenderIndexShop = (filePath, req, res) => {
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
};