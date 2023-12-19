//RENDERIZAR IMAGENES EN LOS RECUADROS
const inputFront = document.getElementById('image_Front');
const inputBack = document.getElementById('image_Back');
const imgFront = document.querySelector('.card-gallery-wrapper:nth-child(1) img');
const imgBack = document.querySelector('.card-gallery-wrapper:nth-child(2) img');

inputFront.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imgFront.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

inputBack.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imgBack.src = e.target.result;
  };

  reader.readAsDataURL(file);
});


//BUTTON
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
