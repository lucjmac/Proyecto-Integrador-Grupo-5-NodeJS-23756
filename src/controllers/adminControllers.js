import path from "path";
import fs from "fs";
import { renderPage } from "../services/headerFooter.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class adminController {
    constructor() {}

    adminGet(req, res) {
        const filePath = path.join(viewsPath, "admin.html");
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
    }

    adminCreateGet(req, res) {
        const filePath = path.join(viewsPath, "create.html");
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
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    adminEditIdGet(req, res) {
        const filePath = path.join(viewsPath, "edit.html");

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
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
