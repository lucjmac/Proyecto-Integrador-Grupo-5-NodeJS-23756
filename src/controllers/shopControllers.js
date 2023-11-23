import path from "path";
import { renderIndexShop } from "../Services/renderPage.js";

const viewsPath = path.resolve() + "/src/views/shop";

export class shopController {
    constructor() {}

    shopGet(req, res) {
        const filePath = path.join(viewsPath, "shop.html");
        renderIndexShop(filePath, req, res);
    }

    itemIdGet(req, res) {
        const filePath = path.join(viewsPath, "item.html");
        renderIndexShop(filePath, req, res);
    }

    itemIdAddPost(req, res) {
        res.send("Route for add the current item to the shop cart ");
    }

    shopCartGet(req, res) {
        const filePath = path.join(viewsPath, "cart.html");
        renderIndexShop(filePath, req, res);
    }

    shopCartPost(req, res) {
        res.send("Route for go to checkout page");
    }
}
