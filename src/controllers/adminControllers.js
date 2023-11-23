import path from "path";
import { renderAdmin } from "../Services/renderPage.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class adminController {
    constructor() {}

    adminGet(req, res) {
        const filePath = path.join(viewsPath, "admin.html");
        renderAdmin(filePath, req, res);
    }

    adminCreateGet(req, res) {
        const filePath = path.join(viewsPath, "create.html");
        renderAdmin(filePath, req, res);
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    adminEditIdGet(req, res) {
        const filePath = path.join(viewsPath, "edit.html");
        renderAdmin(filePath, req, res);
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
