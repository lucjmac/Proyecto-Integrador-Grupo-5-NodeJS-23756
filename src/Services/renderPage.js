import fs from "fs";
import { pugRender } from "../helpers/pugHelper.js";

export const renderContent = (filePath, header, footer, req, res) => {
    const headerContent = pugRender(header);
    const footerContent = pugRender(footer);

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
    renderContent(filePath, "headerIndexShop", "footerIndexShop", req, res);
};