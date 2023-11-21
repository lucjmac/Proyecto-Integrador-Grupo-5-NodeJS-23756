import path from "path";
import fs from "fs";
import { renderPage } from "../services/headerFooter.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class authController {
    constructor() {}

    authLoginGet(req, res) {
        const filePath = path.join(viewsPath, "login.html");
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

    authLoginPost(req, res) {
        res.send("Route for auth/login POST");
    }

    authRegisterGet(req, res) {
        const filePath = path.join(viewsPath, "register.html");
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

    authRegisterPost(req, res) {
        res.send("Route for auth/register POST");
    }

    authLogoutGet(req, res) {
        res.send("Route for Logout");
    }
}
