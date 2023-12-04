import fs from "fs";
import { ejsRender } from "../helpers/ejsHelper.js";

export const renderContent = (filePath, header, footer, req, res) => {
    const headerContent = ejsRender(header);
    const footerContent = ejsRender(footer);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error interno del servidor");
        }

        const content = headerContent + data + footerContent;
        res.send(content);
    });
};

export const renderAdmin = (filePath, req, res) => {
    renderContent(filePath, "headerAdmin", "footerAdmin", req, res);
};

export const renderIndexShop = (filePath, req, res) => {
    renderContent(filePath, "hShop", "fShop", req, res);
};