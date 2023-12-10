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
      console.log("Consulta a la tabla " + id);
      const query = `SELECT *  FROM product WHERE product_id  = ${id}`;
      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
  consultaCategory: async (id) => {
    try {
      console.log("Consulta a la tabla " + id);
      const query = `SELECT *  FROM category WHERE id  = ${id}`;
      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
  consultaLicence: async (id) => {
    try {
      console.log("Consulta a la tabla " + id);
      const query = `SELECT *  FROM licence WHERE id  = ${id}`;
      const consulta = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
};

export default getProduct;
