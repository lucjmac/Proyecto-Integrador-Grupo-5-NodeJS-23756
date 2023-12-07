import * as productList from "../data/productList.js"; 

export const getProductByCode = (code) => {

    const product = productList.productList.find((product) => product.code === code);

    return product || null;
};
