const HOST = window.location.origin;
const button = document.getElementById("modificar");

button.addEventListener("click", () => {
  const productId = button.dataset.productId;
  console.log("w", productId, button.dataset);
  const newProductCategory = document.querySelector(".category_name").value;
  const newProductlicence = document.querySelector(".licence_name").value;
  const newProductName = document.querySelector(".product_name").value;
  const newProductDescription = document.querySelector(".product_description").value;
  const newProductSku = document.querySelector(".sku").value;

  let newProductPrice = document.querySelector(".price").value;
  newProductPrice = Number(newProductPrice.split("$")[1].trim());

  const newProductStock = document.querySelector(".stock").value;
  const newProductDiscount = document.querySelector(".discount").value;
  const newProductDues = document.querySelector(".dues").value;
  const imgFront = document.querySelector(".image_Front");
  const newProductImgFront = imgFront.value || imgFront.dataset.value;
  const imgBack = document.querySelector(".image_Back");
  const newProductImgBack = imgBack.value || imgBack.dataset.value;

  const updatedProduct = {
    category_name: newProductCategory,
    licence_name: newProductlicence,
    product_name: newProductName,
    product_description: newProductDescription,
    sku: newProductSku,
    price: newProductPrice,
    stock: newProductStock,
    discount: newProductDiscount,
    dues: newProductDues,
    image_Front: newProductImgFront,
    image_Back: newProductImgBack,
  };

  fetch(`${HOST}/admin/edit/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Producto actualizado exitosamente");

        const backToAdmin = confirm(
          "Producto modificado exitosamente. Desea volver a la lista de productos?"
        );

        if (backToAdmin) window.location.href = "/admin";
      } else {
        console.error("Error al actualizar el producto");
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud PUT:", error);
    });
});
