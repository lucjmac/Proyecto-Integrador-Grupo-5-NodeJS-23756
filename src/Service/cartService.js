import conn from "../config/conn.js";

const cartService = {
  /**
   * Consulta por tabla
   * @param {consulta}
   */
  consulta: async () => {
    try {
      const query = "select * from sql10668848.cart";
      const resultados = await conn.query(query);

      return resultados;
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
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
      const [productExists] = await conn.query(
        "SELECT * FROM sql10668848.cart WHERE id_product = ?",
        [product_id]
      );

      if (productExists.length === 0) {
        const query = "INSERT INTO sql10668848.cart  VALUES(?,?,?,?,?);";
        const consulta = await conn.query(query, [
          id,
          id_cart,
          id_user,
          product_id,
          quantity,
        ]);

        return consulta;
      } else {
        const existingQuantity = productExists[0].quantity;
        const newQuantity =
          parseInt(existingQuantity, 10) + parseInt(quantity, 10);
        const query =
          "UPDATE sql10668848.cart SET quantity = ? WHERE id_product = ?";
        const consulta = await conn.query(query, [newQuantity, product_id]);

        return consulta;
      }
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
  modificar: async (valor) => {
    const { product_id, quantity } = valor;

    try {
      const query = "UPDATE cart SET quantity = ? WHERE id_product = ?";
      const consulta = await conn.query(query, [quantity, product_id]);

      return consulta;
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
  delete: async (productId) => {
    try {
      const query = "delete from cart  WHERE id_product = ?";
      const result = await conn.query(query, [productId.productId]);
      return { success: true, result };
    } catch (error) {
      console.log("Error al realizar conexion con BBDD: " + error);
    }
  },
};

export default cartService;
