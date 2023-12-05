document.addEventListener("DOMContentLoaded", () => {
  function calculateTotal() {
    const productItemWrappers = document.querySelectorAll(".product-item");

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
        });
        subtract.addEventListener("click", () => {
          const newTotal = Number(totalPrice - price).toFixed(2);

          totalPrice = newTotal < 0 ? 0 : newTotal;
          total.innerHTML = `$${totalPrice}`;
        });

        quantity.addEventListener("change", () => {
          totalPrice = Number(price * quantity.value).toFixed(2);
          total.innerHTML = `$${totalPrice}`;
        });
      }
    });
  }

  calculateTotal();
});
