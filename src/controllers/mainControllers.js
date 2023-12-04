import path from "path";
//import { renderIndexShop } from "../Services/renderPage.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
    constructor() {}

    homeGet(req, res) {
        res.render(path.join(viewsPath, "index.ejs"), {
                 data:'T0D0 ARRAY'
        });
    }

    contactGet(req, res) {
        res.render(path.join(viewsPath, "/shop/contact.ejs"), {});
    }

    /*
    aboutGet(req, res) {
        res.send("Route for About View");
    }

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    }*/
}
