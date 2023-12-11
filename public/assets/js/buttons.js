// Función de Yair para vista Item

// const add = document.querySelector('#add');
// const subtract = document.querySelector('#subtract');
// const quantity = document.querySelector('#quantity');

// add.addEventListener('click', () => quantity.value = Number(quantity.value) + 1);
// subtract.addEventListener('click', () => {
//     if (quantity.value>0) {
//         quantity.value = Number(quantity.value) - 1
//     }
// });

// Segunda función  de Lucas que incorpora cambios para que la funcion de Yair funcione en la vista Cart

// document.addEventListener('DOMContentLoaded', () => {
//   const quantityfn = (addId, subtractId, quantityId) => {
//     //Comienzo Función de Yair para vista Item
//     const add = document.querySelector(`#${addId}`);
//     const subtract = document.querySelector(`#${subtractId}`);
//     const quantity = document.querySelector(`#${quantityId}`);

//     add.addEventListener('click', () => {
//       console.log('Click en el botón de suma');
//       quantity.value = Number(quantity.value) + 1;
//     });

//     subtract.addEventListener('click', () => {
//       console.log('Click en el botón de resta');
//       if (quantity.value > 0) {
//         quantity.value = Number(quantity.value) - 1;
//       }
//     });
//   }
//     // Fin Función de Yair para vista Item

//     // Para verificar si el archivo actual es 'item.html' o 'cart.html'

//   if (window.location.pathname.includes('item.html')) {
//     quantityfn('add', 'subtract', 'quantity');
//   }

//   if (window.location.pathname.includes('cart.html')) {
//     quantityfn('add1', 'subtract1', 'quantity1');
//     quantityfn('add2', 'subtract2', 'quantity2');
//   }
// });

// Tercera funcion de Luisa, reemplaza document.querySelector por document.getElementById

function disableButton(button, quantity) {
  button.toggleAttribute("disabled", quantity <= 0);
}

document.addEventListener("DOMContentLoaded", () => {
  function setupQuantityControls() {
    const quatityWrapper = document.querySelectorAll(
      ".quantity-action-wrapper"
    );

    quatityWrapper.forEach((wrapper) => {
      const add = wrapper.querySelector("#add");
      const subtract = wrapper.querySelector("#subtract");
      const quantity = wrapper.querySelector("#quantity");
      const submit = wrapper.querySelector(".submit");

      disableButton(subtract, quantity.value);
      submit && disableButton(submit, quantity.value);

      if (add && subtract && quantity) {
        add.addEventListener("click", () => {
          quantity.value = Number(quantity.value) + 1;
          disableButton(subtract, quantity.value);
          submit && disableButton(submit, quantity.value);
        });
        subtract.addEventListener("click", () => {
          if (quantity.value > 0) {
            quantity.value = Number(quantity.value) - 1;
          }
          disableButton(subtract, quantity.value);
          submit && disableButton(submit, quantity.value);
        });
        quantity.addEventListener("change", () => {
          if (quantity.value < 0) {
            quantity.value = 0;
          }
          disableButton(subtract, quantity.value);
          submit && disableButton(submit, quantity.value);
        });
      }
    });
  }

  setupQuantityControls();
});
