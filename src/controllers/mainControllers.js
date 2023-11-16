import path from "path";

const root = path.resolve();
export class mainController {
    constructor() {}

    homeGet(req, res){
            res.sendFile(path.join(root, "src", "views", "index.html"));
            };
    

    contactGet(req, res) {
        res.sendFile(path.join(root, "src", "views", "shop", "contact.html"));
    }

    aboutGet(req, res) {
        res.send("Route for About View");
    }

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    }
}
