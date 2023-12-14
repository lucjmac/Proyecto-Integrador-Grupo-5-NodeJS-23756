import path from "path";
import { sliderItems } from "../data/sliderItems.js";
import { shopCollections } from "../data/shopCollections.js";

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

  shopGet(req, res) {
    res.render(path.join(viewsPath, "shop.ejs"), {
      shopCollections: shopCollections,
    });
  }

  async itemIdGet(req, res) {
    const id = req.params.id;
    const [product] = await getProduct.consulta(id);
    const { category_id, licence_id } = product[0];
    const category = await getProduct.consultaCategory(category_id);
    const [licence] = await getProduct.consultaLicence(licence_id);

    res.render(path.join(viewsPath, "item.ejs"), {
      sliderItems: sliderItems,
      product: product[0],
      category,
      licence: licence[0],
    });
  }

  async shopCartGet(req, res) {
    const { cartItems } = await getCartItems();

    res.render(path.join(viewsPath, "cart.ejs"), {
      cartItems,
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
  async shopCartDelete(req, res) {
    try {
      await cartService.delete(req.body);

      const { cartItems } = await getCartItems();

      res.json({ cartItems: cartItems || [] });
    } catch (error) {
      console.error("Error in shopCartDelete:", error);
    }
  }
  shopCartPost(req, res) {
    res.send("Route for go to checkout page");
  }
}
