import * as productList from "../data/productList.js"; 

export const getProductByIdAdminToEdit = (id) => {

    const product = productList.productList.find((product) => product.id === id);

    return product || null;
};
