import path from "path";

const viewsPath = path.resolve() + "/src/views/admin";

export class authController {
    constructor() {}

    authLoginGet(req, res) {
        res.render(path.join(viewsPath, "login.ejs"), {});
    }

    authRegisterGet(req, res) {
        res.render(path.join(viewsPath, "register.ejs"), {});
    }

    authLoginPost(req, res) {
        res.send("Route for auth/login POST");
    }

    authRegisterPost(req, res) {
        res.send("Route for auth/register POST");
    }

    authLogoutGet(req, res) {
        res.send("Route for Logout");
    }
}
