export class shopController {
    constructor() {}

    shopGet(req, res) {
        res.send("Route for Shop View");
    }

    itemIdGet(req, res) {
        res.send("Route for find and retrieve a product from and ID");
    }

    itemIdAddPost(req, res) {
        res.send("Route for add the current item to the shop cart ");
    }

    shopCartGet(req, res) {
        res.send("Route for Cart View");
    }

    shopCartPost(req, res) {
        res.send("Route for go to checkout page");
    }
}
