import conn from "../config/conn.js";

export const getIndexCollections = async () => {
  const indexCollections = await conn.query(
    "SELECT id, licence_name, licence_description, licence_image, licence_alt FROM licence"
  );
  return indexCollections[0];
};

export const getSliderItems = async () => {
  const sliderItems = await conn.query(
    "SELECT product_id, product_name, product_description, image_Front, image_Back, licence_id, price, dues FROM product"
  );

  return sliderItems;
};

export const formatItemsData = async () => {
  const indexCollections = await getIndexCollections();

  let sliderItems = await getSliderItems();

  sliderItems = sliderItems[0].map((item) => {
    const licenceName = indexCollections.find(
      (collection) => collection.id === item.licence_id
    );

    return {
      ...item,
      licence: licenceName.licence_name || "",
      duesText:
        item.dues === 1
          ? "cuota sin interés"
          : `${item.dues} cuotas
        sin interés`,
    };
  });
  return { indexCollections, sliderItems };
};

export const indexSliderService = async () => {
  try {
    const { sliderItems, indexCollections } = await formatItemsData();

    return {
      indexCollections,
      sliderItems,
    };
  } catch (error) {
    console.error("Error al obtener los datos del slider:", error);
    throw new Error("Error al obtener los datos del slider");
  }
};
