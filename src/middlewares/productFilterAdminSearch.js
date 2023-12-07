import { productList } from "../data/productList.js";

export const productFilterAdminSearch = (req, res, next) => {
    // obtiene el valor de  "searchInput" desde la solicitud
    const searchInput = req.query.searchInput;
    
    // filtra la lista según el valor de búsqueda
    const filteredProductList = productList.filter(
        (product) =>
            !searchInput || // si no hay valor de búsqueda
            searchInput.trim() === "" || // o la busqueda está vacía
            product.name.includes(searchInput) // o si el nombre del producto incluye el valor de búsqueda
    );
    
    // agrega las variables filtradas a la solicitud para que estén disponibles en adminController.js
    req.filteredProductList = filteredProductList;
    req.searchInput = searchInput;
    req.noResults = filteredProductList.length === 0;
    
    next();
}