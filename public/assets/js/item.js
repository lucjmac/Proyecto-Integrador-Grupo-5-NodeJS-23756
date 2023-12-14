const HOST = window.location.origin;
const form = document.querySelector("form.figure-form");
const addToCartMessage = document.querySelector(
  "form.figure-form .addToCartMessage"
);
const quantityInput = document.querySelector(
  "form.figure-form .item__cart .item__input"
);
const miniCartBubble = document.querySelector(".navbar_cart .bubble");

const updateMiniCart = () => {
  const totalItems = localStorage.getItem("cartItems");
  miniCartBubble.innerText = totalItems;
};

const addToCart = async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  const { product_id } = formProps;

  //   TODO: sacar el user ID que este almacenado en el local storage
  const userID = 2;
  const id = Math.floor(Math.random() * 10000 + 1);
  const id_cart = 231;

  const cartId = localStorage.getItem("cartId");
  if (!cartId) {
    localStorage.setItem("cartId", id_cart);
  }

  fetch(`${HOST}/shop/item/${product_id}/add`, {
    method: "POST",
    body: JSON.stringify({ ...formProps, id, id_cart, id_user: userID }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("cartItems", data.response.totalItems);
      updateMiniCart();

      if (addToCartMessage) {
        addToCartMessage.innerText = "Producto agregado exitosamente";

        setTimeout(() => {
          addToCartMessage.innerText = "";
        }, 2000);
      }
      if (quantityInput) quantityInput.value = 0;
    })
    .catch((error) => console.error("Error:", error));
};

form && form.addEventListener("submit", addToCart);

miniCartBubble && updateMiniCart();
