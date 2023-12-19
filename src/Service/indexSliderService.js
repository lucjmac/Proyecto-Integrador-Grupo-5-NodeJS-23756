import conn from "../config/conn.js";

export const getIndexCollections = async () => {
  const indexCollections = await conn.query("SELECT * FROM licence ");

  // const indexCollections = await conn.query(
  //   "SELECT l.id, l.licence_name, l.licence_description, l.licence_image, p.product_description FROM licence l JOIN product p ON l.licence_image = p.image_Front"
  // );

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
