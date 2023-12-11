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
    const cartItems = await cartService.consulta();
    console.log("cartItems", cartItems);
    res.render(path.join(viewsPath, "cart.ejs"), { cartItems });
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
