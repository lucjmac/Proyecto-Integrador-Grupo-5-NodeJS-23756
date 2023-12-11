import path from "path";
import { sliderItems } from "../data/sliderItems.js";
import { shopCollections } from "../data/shopCollections.js";

import getProduct from "../Service/getProductDataById.js";
import cartService from "../Service/cartService.js";

const viewsPath = path.resolve() + "/src/views/shop";

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
    const [cart] = await cartService.consulta();
    console.log("cart", cart);
    const productIds = cart.map((item) => {
      return item.id_product;
    });

    let [cartItems] = await getProduct.consultaVarios(productIds);

    // console.log("cartItems", cartItems);
    const cartItemsLicences = cartItems.map((item) => {
      return item.licence_id;
    });

    const [licences] = await getProduct.consultaLicenceVarios(
      cartItemsLicences
    );

    cartItems = cartItems.map((item) => {
      const getLicence = licences.find(
        (licence) => licence.id === item.licence_id
      );

      return {
        ...item,
        licence: getLicence.licence_name,
      };
    });

    res.render(path.join(viewsPath, "cart.ejs"), {
      cartItems,
      cart,
    });
  }

  async itemIdAddPost(req, res) {
    await cartService.insertar(req.body);
    const [response] = await cartService.consultaCantidad(req.body.id_cart);

    res.json({ response });
  }

  shopCartPost(req, res) {
    res.send("Route for go to checkout page");
  }
}
