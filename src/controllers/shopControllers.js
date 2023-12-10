import path from "path";
import { sliderItems } from "../data/sliderItems.js";
import { shopCollections } from "../data/shopCollections.js";
import { cartItems } from "../data/cartItems.js";

import getProduct from "../Service/getProductDataById.js";

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
    const product = await getProduct.consulta(id);
    const { category_id, licence_id } = product[0][0];
    const category = await getProduct.consultaCategory(category_id);
    const licence = await getProduct.consultaLicence(licence_id);
    console.log("qqq", product[0][0]);
    console.log("category", category);
    console.log("licence", licence);
    res.render(path.join(viewsPath, "item.ejs"), {
      sliderItems: sliderItems,
      product: product[0][0],
      category,
      licence: licence[0][0],
    });
  }

  shopCartGet(req, res) {
    res.render(path.join(viewsPath, "cart.ejs"), { cartItems });
  }

  itemIdAddPost(req, res) {
    res.send("Route for add the current item to the shop cart ");
  }

  shopCartPost(req, res) {
    res.send("Route for go to checkout page");
  }
}
