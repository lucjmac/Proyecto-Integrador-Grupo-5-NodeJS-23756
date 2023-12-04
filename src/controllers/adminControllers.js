import path from "path";
import { productList } from "../data/productList.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class adminController {
    constructor() {}

    adminGet(req, res) {
        res.render(path.join(viewsPath, "admin.ejs"), {
            productList: productList,
        });
    }

    adminCreateGet(req, res) {
        res.render(path.join(viewsPath, "create.ejs"), {});
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    adminEditIdGet(req, res) {
        //T0D0 BUSCAR POR ID
        res.render(path.join(viewsPath, "edit.ejs"), {});
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
