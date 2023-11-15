export class adminController {
    constructor() {}

    adminGet(req, res) {
        res.send("Route for Admin View");
    }

    adminCreateGet(req, res) {
        res.send("Route for create item in Admin View");
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    adminEditIdGet(req, res) {
        res.send("Route for edit/:id get");
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
