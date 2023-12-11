import conn from "../config/conn.js";

const cartService = {
  /**
   * Consulta por tabla
   * @param {consulta}
   */
  consultaCantidad: async (cartId) => {
    try {
      const query = `select sum(quantity) as totalItems from sql10668848.cart WHERE cart_id = ${cartId}`;
      const [consulta] = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
  insertar: async (valor) => {
    const { product_id, quantity, id, id_cart, id_user } = valor;
    try {
      const query = "INSERT INTO sql10668848.cart  VALUES(?,?,?,?,?);";
      const consulta = await conn.query(query, [
        id,
        id_cart,
        id_user,
        product_id,
        quantity,
      ]);

      return consulta;
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
};

export default cartService;
