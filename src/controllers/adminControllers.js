import path from "path";
import { conn } from "../config/conn.js";
import {
    getFilteredProductList,
    getProductById,
} from "../service/adminService.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class adminController {
    constructor() {}

    async adminGet(req, res) {
        const searchInput = req.query.searchInput;

        try {
            const filteredProductList = await getFilteredProductList(
                searchInput
            );

            res.render(path.join(viewsPath, "admin.ejs"), {
                productList: filteredProductList,
                searchInput: searchInput,
                noResults: filteredProductList.length === 0,
            });
        } catch (error) {
            console.error("Error executing queries:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    adminCreateGet(req, res) {
        res.render(path.join(viewsPath, "create.ejs"), {});
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    async adminEditIdGet(req, res) {
        const productId = req.params.id;

        try {
            const productData = await getProductById(productId);

            res.render(path.join(viewsPath, "edit.ejs"), productData);
        } catch (error) {
            console.error("Error retrieving product from database:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    async adminEditIdDelete(req, res) {
        try {
            const productId = req.params.id;
            const method = req.body._method;

            if (req.method === "POST" && req.body._method === "DELETE") {
                const deleteQuery = `DELETE FROM product WHERE product_id = ?`;

                conn.query(deleteQuery, [productId], (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Error al borrar el producto");
                    } else {
                        res.send("Producto borrado exitosamente");
                    }
                });
            } else {
                res.status(400).send("Solicitud inválida");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al borrar el producto");
        }
    }
}
