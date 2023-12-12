import path from "path";
import { sliderItems } from "../data/sliderItems.js";
import { shopCollections } from "../data/shopCollections.js";
import { cartItems } from "../data/cartItems.js";

const viewsPath = path.resolve() + "/src/views/shop";

export class shopController {
    constructor() {}

    shopGet(req, res) {
        const licenceName = req.query.licence_name;
        console.log('licenceName:', licenceName); 
        res.render(path.join(viewsPath, "shop.ejs"), {
            shopCollections: shopCollections,
            licenceName: licenceName
        });
    }

    itemIdGet(req, res) {
        res.render(path.join(viewsPath, "item.ejs"), {
            sliderItems: sliderItems,
        });
    }

    shopCartGet(req, res) {
        res.render(path.join(viewsPath, "cart.ejs"), { cartItems });
    }

    itemIdAddPost(req, res) {
        res.send("Route for add the current item to the shop cart ");
    }

    shopCartPost(req, res) {
        res.send("Route for go to checkout page");
    }
}
