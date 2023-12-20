import conn from "../config/conn.js";

const cartService = {
  /**
   * Consulta por tabla
   * @param {consulta}
   */
  consulta: async () => {
    try {
      const query = "select * from cart";
      const resultados = await conn.query(query);

      return resultados;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD cartService.consulta: " + error
      );
    }
  },
  consultaCantidad: async (cartId) => {
    try {
      const query = `select sum(quantity) as totalItems from cart WHERE cart_id = ${cartId}`;
      const [consulta] = await conn.query(query);

      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD cartService.consultaCantidad: " +
          error
      );
    }
  },
  insertar: async (valor) => {
    const { product_id, quantity, id, id_cart } = valor;

    try {
      const [productExists] = await conn.query(
        "SELECT * FROM cart WHERE id_product = ?",
        [product_id]
      );

      if (productExists.length === 0) {
        const query = "INSERT INTO cart  VALUES(?,?,?,?);";
        const consulta = await conn.query(query, [
          id,
          product_id,
          quantity,
          id_cart,
        ]);

        return consulta;
      } else {
        const existingQuantity = productExists[0].quantity;
        const newQuantity =
          parseInt(existingQuantity, 10) + parseInt(quantity, 10);
        const query = "UPDATE cart SET quantity = ? WHERE id_product = ?";
        const consulta = await conn.query(query, [newQuantity, product_id]);

        return consulta;
      }
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD cartService.insertar: " + error
      );
    }
  },
  modificar: async (valor) => {
    const { product_id, quantity } = valor;

    try {
      const query = "UPDATE cart SET quantity = ? WHERE id_product = ?";
      const consulta = await conn.query(query, [quantity, product_id]);

      return consulta;
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD cartService.modificar: " + error
      );
    }
  },
  delete: async (productId) => {
    try {
      const query = "delete from cart  WHERE id_product = ?";
      const result = await conn.query(query, [productId.productId]);
      return { success: true, result };
    } catch (error) {
      console.log(
        "Error al realizar conexion con BBDD cartService.delete: " + error
      );
    }
  },
};

export default cartService;
