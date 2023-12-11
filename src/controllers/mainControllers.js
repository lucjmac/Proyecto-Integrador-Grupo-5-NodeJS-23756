import path from "path";
import { conn } from "../config/conn.js";
import { indexCollections } from "../data/indexCollections.js";
import { sliderItems } from "../data/sliderItems.js";

const viewsPath = path.resolve() + "/src/views";

export class mainController {
    constructor() {}

    async homeGet(req, res) {
        try {
            const indexCollections = await conn.query(
                "SELECT id, licence_name, licence_description, licence_alt FROM licence"
            );
            console.log("indexCollections:", indexCollections); // Imprimir los valores de indexCollections
    
            const sliderItems = await conn.query(
                "SELECT product_id, product_name, product_description, image_Front, image_Back, licence_id, price, dues FROM product"
            );
            console.log("sliderItems:", sliderItems); // Imprimir los valores de sliderItems
    
            const itemsWithModifiedData = sliderItems.map((item) => {
                const licence = indexCollections.find(
                    (collection) => collection.id === item.licence_id
                );
                const modifiedItem = { ...item };
    
                modifiedItem.link = `/item/${item.product_name}`;
                modifiedItem.licence_id = licence ? licence.licence_name : "";
                modifiedItem.duesText =
                    item.dues === 1
                        ? "cuota sin interés"
                        : `${item.dues} cuotas sin interés`;
    
                return modifiedItem;
            });
    
            console.log("itemsWithModifiedData:", itemsWithModifiedData); // Imprimir los valores de itemsWithModifiedData
    
            res.render(path.join(viewsPath, "index.ejs"), {
                indexCollections: indexCollections,
                sliderItems: itemsWithModifiedData,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al obtener los datos de la base de datos");
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
