import { productList } from "../data/productList.js";

export const productFilterAdminSearch = (req, res, next) => {
    
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
    
    next();
}