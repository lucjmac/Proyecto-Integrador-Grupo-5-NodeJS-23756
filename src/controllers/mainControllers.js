import path from "path";
import { formatItemsData } from "../service/indexSliderService.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
  constructor() {}

  async homeGet(req, res) {
    const { indexCollections, sliderItems } = await formatItemsData().catch(
      (error) => {
        console.error("Error al obtener los datos del slider:", error);
        res.status(500).send("Error al obtener los datos de la base de datos");
      }
    );

    res.render(path.join(viewsPath, "index.ejs"), {
      indexCollections,
      sliderItems,
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
