// import { productList } from "../data/productList.js";
// export function getProductDataById(productId) {
//     return productList.find((product) => product.id === productId);
// }

import conn from "../config/conn.js";

const getProduct = {
  /**
   * Consulta por tabla
   * @param {consulta}
   */
  consulta: async (id) => {
    try {
      const query = `SELECT *  FROM product WHERE product_id  = ${id}`;
      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD getProduct.consulta: " + error
      );
    }
  },
  consultaVarios: async (arrayIds) => {
    try {
      const query = `
        SELECT *
        FROM product
        WHERE product_id IN (${arrayIds.join(", ")});
      `;
      console.log(arrayIds, "arrayIds");
      const consulta = await conn.query(query);
      console.log(consulta, "p");
      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD getProduct.consultaVarios: " +
          error
      );
    }
  },
  consultaCategory: async (id) => {
    try {
      const query = `SELECT *  FROM category WHERE id  = ${id}`;
      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD getProduct.consultaCategory: " +
          error
      );
    }
  },
  consultaCategoryVarios: async (arrayIds) => {
    try {
      const query = `
        SELECT *
        FROM category
        WHERE id IN (${arrayIds.join(", ")});
      `;

      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD getProduct.consultaCategoryVarios: " +
          error
      );
    }
  },
  consultaLicence: async (id) => {
    try {
      const query = `SELECT *  FROM licence WHERE id  = ${id}`;
      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD getProduct.consultaLicence: " +
          error
      );
    }
  },
  consultaLicenceVarios: async (arrayIds) => {
    try {
      const query = `
      SELECT *
      FROM licence
      WHERE id IN (${arrayIds.join(", ")});
    `;

      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD getProduct.consultaLicenceVarios: " +
          error
      );
    }
  },
};

export default getProduct;
