import path from "path";
import { indexSliderService } from "../service/indexSliderService.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
    constructor() {}

    async homeGet(req, res) {
        try {
            const { indexCollections, sliderItems } = await indexSliderService();

            res.render(path.join(viewsPath, "index.ejs"), {
                indexCollections: indexCollections,
                sliderItems: sliderItems,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(
                "Error al obtener los datos de la base de datos"
            );
        }
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
