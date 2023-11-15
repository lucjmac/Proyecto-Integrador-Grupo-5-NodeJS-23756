export class authController {
    constructor() {}

    authLoginGet(req, res) {
        res.send("Route for Login View");
    }

    authLoginPost(req, res) {
        res.send("Route for auth/login POST");
    }

    authRegisterGet(req, res) {
        res.send("Route for Resgiter View");
    }

    authRegisterPost(req, res) {
        res.send("Route for auth/register POST");
    }

    authLogoutGet(req, res) {
        res.send("Route for Logout");
    }
}
