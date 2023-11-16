import path from "path";

const root = path.resolve();

export class shopController {
    constructor() {}

    shopGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "shop", "shop.html"));
    }

    itemIdGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "shop", "item.html"));
    }

    itemIdAddPost(req, res) {
        res.send("Route for add the current item to the shop cart ");
    }

    shopCartGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "shop", "cart.html"));
    }

    shopCartPost(req, res) {
        res.send("Route for go to checkout page");
    }
}
