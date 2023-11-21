import path from "path";
import { sendRenderAdmin } from "../helpers/sendRenderAdmin.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class authController {
    constructor() {}

    authLoginGet(req, res) {
        const filePath = path.join(viewsPath, "login.html");
        sendRenderAdmin(filePath, req, res);
    }

    authLoginPost(req, res) {
        res.send("Route for auth/login POST");
    }

    authRegisterGet(req, res) {
        const filePath = path.join(viewsPath, "register.html");
        sendRenderAdmin(filePath, req, res);
    }

    authRegisterPost(req, res) {
        res.send("Route for auth/register POST");
    }

    authLogoutGet(req, res) {
        res.send("Route for Logout");
    }
}
