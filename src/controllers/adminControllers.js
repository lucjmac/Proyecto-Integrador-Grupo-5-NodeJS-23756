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
            const query = "SELECT * FROM product WHERE product_id = ?";
            const [rows] = await conn.query(query, [productId]);
    
            if (rows.length === 0) {
                return res.status(404).send("Product not found");
            }
    
            const product = rows[0];
    
            res.render(path.join(viewsPath, "edit.ejs"), {
                productId,
                product,
                category_id: product.category,
                sku: product.sku,
                product_name: product.name,
                licence_id: product.licence,
                product_description: product.description,
                price: product.price,
                stock: product.stock,
                discount: product.discount,
                dues: product.dues,
                image_Front: product.imgfront,
                image_Back: product.imgback,
                category_id: product.category,
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
