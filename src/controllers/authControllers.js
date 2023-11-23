import path from "path";
import { renderAdmin } from "../Services/renderPage.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class authController {
    constructor() {}

    authLoginGet(req, res) {
        const filePath = path.join(viewsPath, "login.html");
        renderAdmin(filePath, req, res);
    }

    authLoginPost(req, res) {
        res.send("Route for auth/login POST");
    }

    authRegisterGet(req, res) {
        const filePath = path.join(viewsPath, "register.html");
        renderAdmin(filePath, req, res);
    }

    authRegisterPost(req, res) {
        res.send("Route for auth/register POST");
    }

    authLogoutGet(req, res) {
        res.send("Route for Logout");
    }
}
