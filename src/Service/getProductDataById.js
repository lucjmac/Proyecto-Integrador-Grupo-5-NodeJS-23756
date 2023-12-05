import { productList } from "../data/productList.js";
export function getProductDataById(productId) {
    return productList.find((product) => product.id === productId);
}
