const HOST = window.location.origin;

const createProduct = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);

  console.log("formProps", formProps);

  let lastId;
  await fetch(`${HOST}/admin/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      lastId = data.data.length;
    });

  fetch(`${HOST}/admin/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formProps, product_id: lastId + 1 }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Producto actualizado exitosamente");

        const backToAdmin = confirm(
          "Producto creado exitosamente. Desea volver a la lista de productos?"
        );

        if (backToAdmin) window.location.href = "/admin";
      } else {
        console.error("Error al actualizar el producto");
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud POST:", error);
    });
};

const form = document.querySelector(".form-container.form-create");

form && form.addEventListener("submit", createProduct);
