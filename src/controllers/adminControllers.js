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
        res.send("Route for create with Get in Admin View");
    }

    async adminCreatePost(req, res) {
        res.send("Route for create with Get in Admin View");
        try {
            const {
                category_name,
                licence_name,
                product_name,
                product_description,
                sku,
                price,
                stock,
                discount,
                dues,
                image_Front,
                image_Back,
            } = req.body;

            const [licenceRows] = await conn.execute(
                "SELECT id FROM licence WHERE licence_name = ?",
                [licence_name]
            );

            if (licenceRows.length === 0) {
                console.error("Licencia no encontrada");
                res.status(404).send("Licencia no encontrada");
                return;
            }

            const licence_id = licenceRows[0].id;

            const [categoryRows] = await conn.execute(
                "SELECT id FROM category WHERE category_name = ?",
                [category_name]
            );
            if (categoryRows.length === 0) {
                console.error("Categoría no encontrada");
                res.status(404).send("Categoría no encontrada");
                return;
            }

            const category_id = categoryRows[0].id;

            await conn.query(
                "INSERT INTO product (licence_id, category_id, product_name, product_description, sku, price, stock, discount, dues, image_Front, image_Back) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    licence_id,
                    category_id,
                    product_name,
                    product_description,
                    sku,
                    price,
                    stock,
                    discount,
                    dues,
                    image_Front,
                    image_Back,
                ]
            );

            console.log("Producto creado exitosamente");
            res.send("Producto creado exitosamente");
        } catch (error) {
            console.error("Error al crear el producto:", error);
            res.status(500).send("Error al crear el producto");
        }
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

    async adminEditIdPut(req, res) {
        try {
            const productId = req.params.id;

            const {
                category_name,
                licence_name,
                product_name,
                product_description,
                sku,
                price,
                stock,
                discount,
                dues,
                image_Front,
                image_Back,
            } = req.body;

            const [licenceRows] = await conn.execute(
                "SELECT id FROM licence WHERE licence_name = ?",
                [licence_name]
            );

            if (licenceRows.length === 0) {
                console.error("Licencia no encontrada");
                res.status(404).send("Licencia no encontrada");
                return;
            }

            const licence_id = licenceRows[0].id;

            const [categoryRows] = await conn.execute(
                "SELECT id FROM category WHERE category_name = ?",
                [category_name]
            );
            if (categoryRows.length === 0) {
                console.error("Categoría no encontrada");
                res.status(404).send("Categoría no encontrada");
                return;
            }

            const category_id = categoryRows[0].id;

            await conn.query(
                "UPDATE product SET licence_id = ?, category_id = ?, product_name = ?, product_description = ?, sku = ?, price = ?, stock = ?, discount = ?, dues = ?, image_Front = ?, image_Back = ? WHERE product_id = ?",
                [
                    licence_id,
                    category_id,
                    product_name,
                    product_description,
                    sku,
                    price,
                    stock,
                    discount,
                    dues,
                    image_Front,
                    image_Back,
                    productId,
                ]
            );

            console.log("Producto actualizado exitosamente");
            res.send("Producto actualizado exitosamente");
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).send("Error al actualizar el producto");
        }
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
