export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const addedMessageTimeoutId = {};

export function addToCart(productId) {
  const previousTimerId = addedMessageTimeoutId[productId];
  if (previousTimerId) {
    clearTimeout(previousTimerId);
  }

  const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
  addedElement.classList.add("added-to-cart-visible");

  const intervalId = setTimeout(() => {
    addedElement.classList.remove("added-to-cart-visible");
  }, 2000);

  addedMessageTimeoutId[productId] = intervalId;

  let matchingItem;

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}
