const HOST = "http://localhost:8080";
const productItemWrappers = document.querySelectorAll(".product-item");
const productItems = document.querySelectorAll(
  ".cart-product-items .product-item"
);

const setItemTotal = () => {
  productItemWrappers.forEach((wrapper) => {
    const price = wrapper.querySelector(".item-price span").innerHTML;
    const quantity = wrapper.querySelector("#quantity");
    const total = wrapper.querySelector(".item-total-price");

    const totalPrice = Number(price * quantity.value).toFixed(2);
    total.innerHTML = `$${totalPrice}`;
  });
};

const summAllItems = () => {
  const totals = [...productItems].reduce((acc, curr) => {
    const itemTotal = curr.querySelector(".item-total-price").innerText;
    const number = Number(itemTotal.split("$")[1]);

    acc = acc + number;

    return acc;
  }, 0);

  return totals;
};

const setSubtotal = () => {
  const summary = document.querySelector(
    ".cart-summary-wrapper .cart-subtotal .summary-paragraph"
  );

  const totals = summAllItems();

  summary.innerHTML = totals.toFixed(2);
};

const setTotal = () => {
  const summary = document.querySelector(
    ".cart-summary-wrapper .cart-total .summary-paragraph"
  );

  const itemsSum = summAllItems();

  const shipping = document
    .querySelector(".cart-summary-wrapper .cart-shipping .summary-paragraph")
    .innerText.split("$")[1];

  summary.innerHTML = (itemsSum + Number(shipping)).toFixed(2);
};

const setResume = () => {
  const summary = document.querySelector(
    ".cart-summary-wrapper .summary-paragraph"
  );

  summary.innerText = productItems.length;

  setSubtotal();
  setTotal();
};

document.addEventListener("DOMContentLoaded", () => {
  function calculateTotal() {
    productItemWrappers.forEach((wrapper) => {
      const price = wrapper.querySelector(".item-price span").innerHTML;
      const add = wrapper.querySelector("#add");
      const subtract = wrapper.querySelector("#subtract");
      const quantity = wrapper.querySelector("#quantity");
      const total = wrapper.querySelector(".item-total-price");
      let totalPrice = 0;

      if (add && subtract && quantity) {
        add.addEventListener("click", () => {
          totalPrice = Number(price * quantity.value).toFixed(2);
          total.innerHTML = `$${totalPrice}`;

          setSubtotal();
          setTotal();
        });
        subtract.addEventListener("click", () => {
          // const newTotal = Number(totalPrice - price).toFixed(2);
          const newTotal = Number(price * quantity.value).toFixed(2);

          totalPrice = newTotal < 0 ? 0 : newTotal;
          total.innerHTML = `$${totalPrice}`;

          setSubtotal();
          setTotal();
        });

        quantity.addEventListener("change", () => {
          totalPrice = Number(price * quantity.value).toFixed(2);
          total.innerHTML = `$${totalPrice}`;

          setSubtotal();
          setTotal();
        });
      }
    });
  }

  calculateTotal();
});

setItemTotal();
setResume();

const deleteItem = (productId) => {
  fetch(`${HOST}/shop/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
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
