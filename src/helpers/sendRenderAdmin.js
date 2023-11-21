import fs from "fs";
import { renderPage } from "../helpers/headerFooter.js";

export const sendRenderAdmin = (filePath, req, res) => {
    const headerContent = renderPage("headerAdmin");
    const footerContent = renderPage("footerAdmin");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error interno del servidor");
        }

        const content = headerContent + data + footerContent;
        res.send(content);
    });
};