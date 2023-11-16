import path from "path";

const root = path.resolve();
export class adminController {
    constructor() {}

    adminGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "admin", "admin.html"));
    }

    adminCreateGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "admin", "create.html"));
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    adminEditIdGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "admin", "edit.html"));
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
