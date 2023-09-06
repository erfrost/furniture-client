import Cookies from "js-cookie";

export const getCartFromCookie = () => {
  const cart = Cookies.get("cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (itemId, count) => {
  const cart = getCartFromCookie();
  const existingProduct = cart.find((item) => item.itemId === itemId);
  console.log(count);
  if (existingProduct) {
    existingProduct.count = count;
  } else {
    cart.push({ itemId, count });
  }

  Cookies.set("cart", JSON.stringify(cart));
};

export const removeFromCart = (itemId) => {
  const cart = getCartFromCookie();
  const updatedCart = cart.filter((item) => item.itemId !== itemId);

  Cookies.set("cart", JSON.stringify(updatedCart));
};
