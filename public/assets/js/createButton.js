const HOST = window.location.origin;
const addButton = document.getElementById("agregar_producto");
const form = document.querySelector(".form-container.form-create");

addButton.addEventListener("click", async () => {
  try {
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);

    fetch(`${HOST}/admin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formProps),
    }).then((response) => {
      if (response.ok) {
        console.log("Producto creado exitosamente");

        const goToAdmin = confirm(
          "Producto creado exitosamente. ¿Desea ir a la lista de productos?"
        );

        if (goToAdmin) {
          window.location.href = "/admin";
        }
      } else {
        console.error("Error al crear el producto");
      }
    });
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
  }
});
