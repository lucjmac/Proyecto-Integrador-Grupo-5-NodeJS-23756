import path from "path";
import { sendRenderIndexShop } from "../helpers/sendRenderIndexShop.js";

const viewsPath = path.resolve() + "/src/views/shop";

export class shopController {
    constructor() {}

    shopGet(req, res) {
        const filePath = path.join(viewsPath, "shop.html");
        sendRenderIndexShop(filePath, req, res);
    }

    itemIdGet(req, res) {
        const filePath = path.join(viewsPath, "item.html");
        sendRenderIndexShop(filePath, req, res);
    }

    itemIdAddPost(req, res) {
        res.send("Route for add the current item to the shop cart ");
    }

    shopCartGet(req, res) {
        const filePath = path.join(viewsPath, "cart.html");
        sendRenderIndexShop(filePath, req, res);
    }

    shopCartPost(req, res) {
        res.send("Route for go to checkout page");
    }
}
