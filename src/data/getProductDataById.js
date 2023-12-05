
import { productList } from './productList.js';
export function getProductDataById(productId) {
    return productList.find(product => product.id === productId);
}