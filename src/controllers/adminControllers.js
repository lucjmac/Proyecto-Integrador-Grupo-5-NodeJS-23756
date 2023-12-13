import path from "path";
import { conn } from "../config/conn.js";
import * as productList from "../data/productList.js";

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

    adminEditIdGet(req, res) {
        const productId = req.params.id;

        const getProductByIdAdminToEdit = (id) => {
            const product = productList.productList.find(
                (product) => product.id === id
            );
            return product || null;
        };

        const product = getProductByIdAdminToEdit(productId);

        res.render(path.join(viewsPath, "edit.ejs"), {
            productList,
            productId,
            product,
            code: product ? product.code : "",
            name: product ? product.name : "",
            collection: product ? product.collection : "",
        });
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
