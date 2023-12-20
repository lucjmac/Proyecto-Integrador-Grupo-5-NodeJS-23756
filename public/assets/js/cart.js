const HOST = window.location.origin;
const productItemWrappers = document.querySelectorAll(".product-item");
const productItemsContainer = document.querySelectorAll(".cart-product-items ");

const updateMiniCart = () => {
  const miniCartBubble = document.querySelector(".navbar_cart .bubble");
  const totalItems = localStorage.getItem("cartItems");
  miniCartBubble.innerText = totalItems;
};
const setItemTotal = () => {
  const productItem = document.querySelectorAll(".product-item");
  productItem.forEach((wrapper) => {
    const price = wrapper.querySelector(".item-price span").innerHTML;
    const quantity = wrapper.querySelector("#quantity");
    const total = wrapper.querySelector(".item-total-price");
    const totalPrice = Number(price * quantity.value).toFixed(2);

    total.innerHTML = `$${totalPrice}`;
  });
};

const sumAllItems = () => {
  const productItemWrappers = document.querySelectorAll(".product-item");
  const totals = [...productItemWrappers].reduce((acc, curr) => {
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
  const productItemsContainer = document.querySelectorAll(
    ".cart-product-items "
  );

  const totals =
    productItemsContainer[0] &&
    productItemsContainer[0].children &&
    productItemsContainer[0].children.length === 0
      ? 0
      : sumAllItems();

  summary.innerHTML = totals.toFixed(2);
};

const setTotal = () => {
  const summary = document.querySelector(
    ".cart-summary-wrapper .cart-total .summary-paragraph"
  );
  const productItemsContainer = document.querySelectorAll(
    ".cart-product-items "
  );

  const itemsSum =
    productItemsContainer[0] &&
    productItemsContainer[0].children &&
    productItemsContainer[0].children.length === 0
      ? 0
      : sumAllItems();

  const shipping =
    productItemsContainer[0] &&
    productItemsContainer[0].children &&
    productItemsContainer[0].children.length === 0
      ? 0
      : document
          .querySelector(
            ".cart-summary-wrapper .cart-shipping .summary-paragraph"
          )
          .innerText.split("$")[1];

  summary.innerHTML = (itemsSum + Number(shipping)).toFixed(2);
};

const setResume = () => {
  const summary = document.querySelector(
    ".cart-summary-wrapper .summary-paragraph"
  );
  const productItemWrappers = document.querySelectorAll(".product-item");

  const totalItems = [...productItemWrappers].reduce((acc, curr) => {
    const quantity = curr.querySelector("#quantity");
    acc = acc + Number(quantity.value);
    return acc;
  }, 0);

  localStorage.setItem("cartItems", totalItems);
  summary.innerText = totalItems;

  setSubtotal();
  setTotal();

  updateMiniCart();
};

const calculateTotal = () => {
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

        setResume();
      });
      subtract.addEventListener("click", () => {
        const newTotal = Number(price * quantity.value).toFixed(2);

        totalPrice = newTotal < 0 ? 0 : newTotal;
        total.innerHTML = `$${totalPrice}`;

        setResume();
      });

      quantity.addEventListener("change", () => {
        totalPrice = Number(price * quantity.value).toFixed(2);
        total.innerHTML = `$${totalPrice}`;

        setResume();
      });
    }
  });
};

calculateTotal();
setItemTotal();
setResume();

const deleteItem = (productId) => {
  const confirmDelete = confirm("Seguro desea eliminar el articulo?");

  if (!confirmDelete) return;

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
      const { cartItems } = data;

      if (!cartItems || cartItems.length > 0) {
        productItemsContainer[0].innerHTML = cartItems.reduce(
          (html, item, index) => {
            return (
              html +
              `
    <li class="product-item card-background">
        <div class="item-detail">
          <img
            src="${item.image_Front}"
            alt="${item.product_name}"
          />
          <div class="item-description">
            <h3 class="item-title">${item.product_name}</h3>
            <p class="item-category">${item.licence} </p>
            <p class="item-price">
              Precio: $ <span> ${item.price}</span>
            </p>
          </div>
        </div>

        <div class="item-quantity quantity-action-wrapper">
          <input
            type="number"
            id="quantity"
            value="${item.selectedQty}"
          />
          <div class="quantity-action">
            <button id="add">
              <img
                src="../../assets/img/icons/plus-icon.svg"
                alt="icono agregar"
              />
            </button>
            <button id="subtract">
              <img
                src="../../assets/img/icons/minus-icon.svg"
                alt="icono quitar"
              />
            </button>
          </div>
        </div>

        <div class="item-total">
          <p class="item-total-price">$0.00</p>
        </div>

        <button
          onclick="deleteItem( ${item.product_id} )"
          class="delete-button"
          aria-label="Eliminar articulo"
        >
          <img
            src="../../assets/img/icons/close-icon.svg"
            alt="icono eliminar"
          />
        </button>
      </li>
    `
            );
          },
          ""
        );
      } else {
        productItemsContainer[0].innerHTML = "";
        const table = document.querySelector(".cart-table");
        const message = document.createElement("p");
        message.innerHTML = "No hay articulos en el carrito";
        table.appendChild(message);
      }
      setupQuantityControls();
      calculateTotal();
    })
    .catch((error) => console.error("Error:", error));
};

const addToCart = async (productId) => {
  const id = Math.floor(Math.random() * 10000 + 1);
  const id_cart = 231;

  const cartId = localStorage.getItem("cartId");
  if (!cartId) {
    localStorage.setItem("cartId", id_cart);
  }

  const quantityInput = document.querySelector(`#quantity-${productId} input`);

  setTimeout(() => {
    fetch(`${HOST}/shop/item/${productId}/add`, {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        quantity: quantityInput.value,
        id,
        id_cart,
        isCart: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error));
  }, 0);
};

const updateElements = (targetElement) => {
  setItemTotal();
  setResume();
  updateMiniCart();
  observeElementRender(".cart-product-items ", updateElements);
};

const observeElementRender = (selector, callback) => {
  const targetElement = document.querySelector(selector);
  const config = { attributes: false, childList: true, subtree: true };

  const observer = new MutationObserver((_, observer) => {
    const targetElement = document.querySelector(selector);

    if (targetElement) {
      callback(targetElement);
      return observer.disconnect();
    }
  });

  targetElement && observer.observe(targetElement, config);
};

observeElementRender(".cart-product-items ", updateElements);
