import path from "path";
import { indexSliderService } from "../service/indexSliderService.js";
import { shopCollections } from "../data/shopCollections.js";
import { cartItems } from "../data/cartItems.js";

const viewsPath = path.resolve() + "/src/views/shop";

export class shopController {
    constructor() {}
    shopGet(req, res) {
        const licenceId = req.query.licence_id;
    
        //! hay que linkear la cont licenceData con la BD
        const licenceData = [
            { id: 1, licence_name: 'POKEMON INDIGO' },
            { id: 2, licence_name: 'STAR WARS & THE MANDALORIAN' },
            { id: 3, licence_name: 'HARRY POTTER' },
        ];
    
        res.render(path.join(viewsPath, "shop.ejs"), {
            shopCollections: shopCollections,
            licenceId: licenceId,
            licenceData: licenceData
        });
    }

    itemIdGet(req, res) {
        const productId = +req.params.id;
    
        const product = shopCollections.find(item => item.product_id === productId);
    
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
    
        let licence;

        if (typeof licenceId !== 'undefined') {
            shopCollections.forEach((product) => {
                if (product.licence_id.toString() === licenceId.toString()) {
                    licence = licenceData.find(licence => licence.id.toString() === product.licence_id.toString());
                }
            });
        }
    
        indexSliderService().then(sliderData => {
            res.render(path.join(viewsPath, "item.ejs"), {
                indexCollections: sliderData.indexCollections,
                sliderItems: sliderData.sliderItems,
                shopCollections: shopCollections,
                product: product,
                licence: licence
            });
        }).catch(error => {
            console.error("Error al obtener los datos del slider:", error);
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
