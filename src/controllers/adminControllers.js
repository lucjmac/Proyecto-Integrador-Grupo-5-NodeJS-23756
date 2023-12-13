import path from "path";
import { productList } from "../data/productList.js";
import { getProductByIdAdminToEdit } from "../service/getProductByIdAdminToEdit.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class adminController {
    constructor() {}

    adminGet(req, res) {
        const searchInput = req.query.searchInput;
    
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
            productList: filteredProductList || productList,
            searchInput: searchInput,
            noResults: req.noResults,
        });
    }

    adminCreateGet(req, res) {
        res.render(path.join(viewsPath, "create.ejs"), {});
    }

    adminCreatePost(req, res) {
        res.send("Route for create with POST in Admin View");
    }

    adminEditIdGet(req, res) {
        const productId = req.params.id;
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
