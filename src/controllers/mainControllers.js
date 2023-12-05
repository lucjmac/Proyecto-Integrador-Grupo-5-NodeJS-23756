import path from "path";
import { indexCollections } from "../data/indexCollections.js";
import { sliderItems } from "../data/sliderItems.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
    constructor() {}

    homeGet(req, res) {
        res.render(path.join(viewsPath, "index.ejs"), {
            indexCollections: indexCollections,
            sliderItems: sliderItems,
        });
    }

    contactGet(req, res) {
        res.render(path.join(viewsPath, "/shop/contact.ejs"), {});
    }

    aboutGet(req, res) {
        res.send("Route for About View");
    }

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    }
}
