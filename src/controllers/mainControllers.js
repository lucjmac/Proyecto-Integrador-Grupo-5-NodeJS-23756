export class mainController {
    constructor() {}

    homeGet(req, res) {
        res.send("Route for Home View");
    }

    contactGet(req, res) {
        res.send("Route for Contact View");
    }

    aboutGet(req, res) {
        res.send("Route for About View");
    }

    faqsGet(req, res) {
        res.send("Route for Faqs View");
    }
}
