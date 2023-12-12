import conn from "../config/conn.js";
async function getIndexCollections() {
    const indexCollections = await conn.query(
        "SELECT id, licence_name, licence_description, licence_image, licence_alt FROM licence"
    );
    return indexCollections[0];
}

async function getSliderItems() {
    const sliderItems = await conn.query(
        "SELECT product_id, product_name, product_description, image_Front, image_Back, licence_id, price, dues FROM product"
    );
    const itemsWithModifiedData = sliderItems[0].map((item) => {
        const {
            product_id,
            product_name,
            product_description,
            image_Front,
            image_Back,
            licence_id,
            price,
            dues,
        } = item;
        const modifiedItem = {
            product_id,
            product_name,
            product_description,
            image_Front,
            image_Back,
            licence_id,
            price,
            dues,
        };
        return modifiedItem;
    });
    return itemsWithModifiedData;
}

export async function indexSliderService() {
    const indexCollections = await getIndexCollections();
    const sliderItems = await getSliderItems();

    return {
        indexCollections: indexCollections,
        sliderItems,
    };
}
