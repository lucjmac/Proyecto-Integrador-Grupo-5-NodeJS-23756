import path from "path";
import { conn } from "../config/conn.js";
import { getFilteredProductList, getProductById } from "../Service/adminService.js";

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
        const productId = req.params.id;
    
        if (req.method === "DELETE") {
            try {
                const result = await conn.query(
                    "DELETE FROM product WHERE product_id = ?",
                    [productId]
                );
    
                if (result.affectedRows === 0) {
                    return res.status(404).send("Producto no encontrado");
                }
    
                res.json({ message: "Producto eliminado exitosamente" });
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                res.status(500).send("Error interno del servidor");
            }
        } else {
            res.status(405).send("Método no permitido");
        }
    }
}
