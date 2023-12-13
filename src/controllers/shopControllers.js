import path from "path";
import { conn } from "../config/conn.js";
import { indexSliderService } from "../service/indexSliderService.js";
import { cartItems } from "../data/cartItems.js";

const viewsPath = path.resolve() + "/src/views/shop";

export class shopController {
    constructor() {}

    async shopGet(req, res) {
        const licenceId = req.query.licence_id;

        try {
            const [licenceRows] = await conn.query(
                "SELECT * FROM licence WHERE id = ?",
                [licenceId]
            );

            const [productRows] = await conn.query(
                "SELECT * FROM product WHERE licence_id = ?",
                [licenceId]
            );

            res.render(path.join(viewsPath, "shop.ejs"), {
                licenceData: licenceRows,
                shopCollections: productRows,
                licenceId: licenceId,
            });
        } catch (error) {
            console.error("Error al consultar los productos:", error);
        }
    }

    async itemIdGet(req, res) {
        try {
            const productId = Number(req.params.id);
            const licenceId = req.params.licenceId;
            
            console.log("productId:", productId);
            console.log("licenceId:", licenceId);
            
            const [rows] = await conn.query(
                "SELECT * FROM product WHERE product_id = ?",
                [productId]
            );
            
            if (rows.length === 0) {
                return res.status(404).send("Producto no encontrado");
            }
            
            const product = rows[0];
            
            let licence;
            
            if (typeof licenceId !== "undefined") {
                const [licenceRows] = await conn.query(
                    "SELECT * FROM licence WHERE id = ?",
                    [licenceId]
                );
                
                if (licenceRows.length > 0) {
                    licence = licenceRows[0];
                }
            }
            
            const sliderData = await indexSliderService();
            
            res.render(path.join(viewsPath, "item.ejs"), {
                indexCollections: sliderData.indexCollections,
                sliderItems: sliderData.sliderItems,
                product: product,
                licence: licence,
                licenceId: licenceId,
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            res.status(500).send("Error al obtener los datos");
        }
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
