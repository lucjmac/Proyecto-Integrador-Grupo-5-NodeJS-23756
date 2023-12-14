import path from "path";
import { conn } from "../config/conn.js";
const viewsPath = path.resolve() + "/src/views/admin";

export class adminController {
    constructor() {}

    async adminGet(req, res) {
        const searchInput = req.query.searchInput;

        try {
            const [productResults] = await conn.query("SELECT * FROM product");
            const productList = productResults;

            for (const product of productList) {
                const [licenceResults] = await conn.query(
                    "SELECT licence_name FROM licence WHERE id = ?",
                    [product.licence_id]
                );
                const licence = licenceResults[0];
                product.licence_name = licence
                    ? licence.licence_name
                    : "Unknown Licence";
            }

            const filteredProductList = productList.filter(
                (product) =>
                    !searchInput ||
                    searchInput.trim() === "" ||
                    product.name.includes(searchInput)
            );

            req.filteredProductList = filteredProductList;
            req.searchInput = searchInput;
            req.noResults = filteredProductList.length === 0;

            res.render(path.join(viewsPath, "admin.ejs"), {
                productList: filteredProductList,
                searchInput: searchInput,
                noResults: req.noResults,
            });
        } catch (error) {
            console.error("Error executing queries:", error);
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
            const productQuery = `
                SELECT p.*, c.category_name, l.licence_name
                FROM product p
                JOIN category c ON p.category_id = c.id
                JOIN licence l ON p.licence_id = l.id
                WHERE p.product_id = ?
            `;
            const [productRows] = await conn.query(productQuery, [productId]);
    
            if (productRows.length === 0) {
                return res.status(404).send("Product not found");
            }
    
            const {
                category_name: category,
                licence_name: licence,
                sku,
                product_name,
                product_description,
                price,
                stock,
                discount,
                dues,
                image_Front,
                image_Back
            } = productRows[0];
    
            res.render(path.join(viewsPath, "edit.ejs"), {
                productId,
                product: productRows[0],
                category,
                licence,
                sku,
                product_name,
                product_description,
                price,
                stock,
                discount,
                dues,
                image_Front,
                image_Back,
            });
        } catch (error) {
            console.error("Error retrieving product from database:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
