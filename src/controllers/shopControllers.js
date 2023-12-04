import path from "path";
//import { renderIndexShop } from "../Services/renderPage.js";

const viewsPath = path.resolve() + "/src/views/shop";

export class shopController {
    constructor() {}

    shopGet(req, res) {
        res.render(path.join(viewsPath, "shop.ejs"), {});
    }

    itemIdGet(req, res) {
        ///T0D0 POR ITEM!
        res.render(path.join(viewsPath, "item.ejs"), {});
    }

    shopCartGet(req, res) {
        res.render(path.join(viewsPath, "cart.ejs"), {});
    }


    itemIdAddPost(req, res) {
        res.send("Route for add the current item to the shop cart ");
    }

    shopCartPost(req, res) {
        res.send("Route for go to checkout page");
    }
}
