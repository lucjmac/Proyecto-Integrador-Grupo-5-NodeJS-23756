import path from "path";
import fs from "fs";
import { renderHeaderAdmin, renderFooterAdmin } from "../services/headerFooter.js";

const root = path.resolve();

export class adminController {
    constructor() {}

    // adminGet(req, res) {
    //     res.sendFile(path.join(root, "src", "views", "admin", "admin.html"));
    // };

    adminGet(req, res) {
        const indexFilePath = path.join(root, "src", "views", "admin", "admin.html");
        const headerContent = renderHeaderAdmin();
        const footerContent = renderFooterAdmin();

        fs.readFile(indexFilePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error interno del servidor");
            };

            const content = headerContent + data + footerContent;
            res.send(content);
        });
    };

    // adminCreateGet(req, res) {
    //     res.sendFile(path.join(root, "src", "views", "admin", "create.html"));
    // };

    adminCreateGet(req, res) {
        const indexFilePath = path.join(root, "src", "views", "admin", "create.html");
        const headerContent = renderHeaderAdmin();
        const footerContent = renderFooterAdmin();

        fs.readFile(indexFilePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error interno del servidor");
            };

            const content = headerContent + data + footerContent;
            res.send(content);
        });
    };

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    };

    // adminEditIdGet(req, res) {
    //     res.sendFile(path.join(root, "src", "views", "admin", "edit.html"));
    // };

    adminEditIdGet(req, res) {
        const indexFilePath = path.join(root, "src", "views", "admin", "edit.html");
        const headerContent = renderHeaderAdmin();
        const footerContent = renderFooterAdmin();

        fs.readFile(indexFilePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error interno del servidor");
            };

            const content = headerContent + data + footerContent;
            res.send(content);
        });
    };

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    };

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    };
}
