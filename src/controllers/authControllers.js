import path from "path";

const root = path.resolve();
export class authController {
    constructor() {}

    authLoginGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "admin", "login.html"));
    }

    authLoginPost(req, res) {
        res.send("Route for auth/login POST");
    }

    authRegisterGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "admin", "register.html"));
    }

    authRegisterPost(req, res) {
        res.send("Route for auth/register POST");
    }

    authLogoutGet(req, res) {
        res.send("Route for Logout");
    }
}
