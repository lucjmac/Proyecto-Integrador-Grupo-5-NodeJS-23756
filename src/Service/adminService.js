import { conn } from "../config/conn.js";

export async function getFilteredProductList(searchInput) {
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

    return filteredProductList;
}


export async function getProductById(productId) {
    const productQuery = `
    SELECT p.*, c.category_name, l.licence_name
    FROM product p
    JOIN category c ON p.category_id = c.id
    JOIN licence l ON p.licence_id = l.id
    WHERE p.product_id = ?
    `;
    const [productRows] = await conn.query(productQuery, [productId]);

    if (productRows.length === 0) {
        throw new Error("Product not found");
    }

    const {
        category_name: category,
        licence_name: licence,
        sku,
        product_name,
        product_description,
        price,
        stock,
        discount,
        dues,
        image_Front,
        image_Back,
    } = productRows[0];

    return {
        productId,
        product: productRows[0],
        category,
        licence,
        sku,
        product_name,
        product_description,
        price,
        stock,
        discount,
        dues,
        image_Front,
        image_Back,
    };
}