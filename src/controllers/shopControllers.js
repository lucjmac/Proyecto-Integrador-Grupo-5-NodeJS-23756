import path from "path";

import { conn } from "../config/conn.js";
import { formatItemsData } from "../service/indexSliderService.js";
import getProduct from "../Service/getProductDataById.js";
import cartService from "../Service/cartService.js";

const viewsPath = path.resolve() + "/src/views/shop";

const getCartItems = async () => {
  const [cart] = await cartService.consulta();

  const productIds = cart.map((item) => {
    return item.id_product;
  });

  if (productIds.length === 0) return [];
  let cartItems = await getProduct.consultaVarios(productIds);

  if (!cartItems || cartItems.length === 0) return [];

  const cartItemsLicences = cartItems[0].map((item) => {
    return item.licence_id;
  });

  const licences = await getProduct.consultaLicenceVarios(cartItemsLicences);

  if (licences) {
    cartItems = cartItems[0].map((item) => {
      const getLicence = licences[0].find(
        (licence) => licence.id === item.licence_id
      );

      const cartItem = cart.find(
        (cartItem) => cartItem.id_product === item.product_id
      );

      return {
        ...item,
        selectedQty: cartItem.quantity,
        licence: getLicence.licence_name,
      };
    });
  }

  return { cartItems };
};

export class shopController {
  constructor() {}

  async shopGet(req, res) {
    const licenceId = req.query.licence_id;

    try {
      let licenceRows;
      let productRows;

      if (licenceId) {
        [licenceRows] = await conn.query("SELECT * FROM licence WHERE id = ?", [
          licenceId,
        ]);

        [productRows] = await conn.query(
          "SELECT * FROM product WHERE licence_id = ?",
          [licenceId]
        );
      } else {
        [licenceRows] = await conn.query("SELECT * FROM licence");

        [productRows] = await conn.query("SELECT * FROM product");
      }

      const productsWithLicence = productRows.map((product) => {
        const licence = licenceRows.find(
          (licence) => licence.id === product.licence_id
        );
        return { ...product, licence };
      });

      res.render(path.join(viewsPath, "shop.ejs"), {
        licenceData: licenceRows,
        shopCollections: productsWithLicence,
        licenceId: licenceId,
        showAllLicences: !licenceId,
      });
    } catch (error) {
      console.error("Error al consultar los productos:", error);
    }
  }

  async shopCartGet(req, res) {
    const { cartItems } = await getCartItems();

    res.render(path.join(viewsPath, "cart.ejs"), {
      cartItems,
    });
  }

  shopCartPost(req, res) {
    res.send("Route for go to checkout page");
  }

  async shopCartDelete(req, res) {
    try {
      await cartService.delete(req.body);

      const { cartItems } = await getCartItems();

      res.json({ cartItems: cartItems || [] });
    } catch (error) {
      console.error("Error in shopCartDelete:", error);
    }
  }

  async itemIdGet(req, res) {
    const id = req.params.id;
    const [product] = await getProduct.consulta(id);
    const { category_id, licence_id } = product[0];
    const category = await getProduct.consultaCategory(category_id);
    const [licence] = await getProduct.consultaLicence(licence_id);

    const { sliderItems } = await formatItemsData();

    res.render(path.join(viewsPath, "item.ejs"), {
      sliderItems: sliderItems,
      product: product[0],
      category,
      licence: licence[0],
    });
  }

  async itemIdAddPost(req, res) {
    const { isCart } = req.body;
    if (isCart) {
      await cartService.modificar(req.body);
    } else {
      await cartService.insertar(req.body);
    }
    const [response] = await cartService.consultaCantidad(req.body.id_cart);

    res.json({ response });
  }
}
