import path from "path";
import { productList } from "../data/productList.js";
// import { getProductByCode } from "../service/getPorductByCode.js";
import { getProductDataById } from "../service/getProductDataById.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class adminController {
    constructor() {}

    adminGet(req, res) {
        /*
        const searchInput = req.query.searchInput; 
    
        const filteredProductList = productList.filter((product) =>
            !searchInput || searchInput.trim() === '' || product.name.includes(searchInput)
        );
    
        if (filteredProductList.length === 0) {
            res.render(path.join(viewsPath, "admin.ejs"), {
                productList: productList,
                searchInput: searchInput,
                noResults: true
            });
        } else {
            res.render(path.join(viewsPath, "admin.ejs"), {
                productList: filteredProductList,
                searchInput: searchInput,
                noResults: false
            });
        }
*/
    }

    adminCreateGet(req, res) {
        res.render(path.join(viewsPath, "create.ejs"), {});
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    adminEditIdGet(req, res) {
        // Recuperar datos del producto por ID y pasarlos a la vista
        const productId = req.params.id;
        const productData = getProductDataById(productId);

        console.log(productData);

        const productCode = req.params.code;

        res.render(path.join(viewsPath, "edit.ejs"), {
            productData: productData,
        });
    }

    adminEditIdPut(req, res) {
        res.send("Route for edit/:id put");
    }

    adminEditIdDelete(req, res) {
        res.send("Route for edit/:id delete");
    }
}
