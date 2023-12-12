import conn from "../config/conn.js";

const getIndexCollections = async () => {
    const indexCollections = await conn.query(
        "SELECT id, licence_name, licence_description, licence_image, licence_alt FROM licence"
    );
    return indexCollections[0];
};

const getSliderItems = async () => {
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
};

export const indexSliderService = async () => {
    try {
        const indexCollections = await getIndexCollections();
        const sliderItems = await getSliderItems();

        return {
            indexCollections: indexCollections,
            sliderItems,
        };
    } catch (error) {
        console.error("Error al obtener los datos del slider:", error);
        throw new Error("Error al obtener los datos del slider");
    }
};