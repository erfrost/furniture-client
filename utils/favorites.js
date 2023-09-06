import Cookies from "js-cookie";

export const getFavoritesFromCookie = () => {
  const favorites = Cookies.get("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (itemId) => {
  const favorites = getFavoritesFromCookie();
  const existingProduct = favorites.find((id) => id === itemId);

  if (existingProduct) {
    return;
  } else {
    favorites.push(itemId);
  }

  Cookies.set("favorites", JSON.stringify(favorites));
};

export const removeFromFavorites = (itemId) => {
  const favorites = getFavoritesFromCookie();
  const updatedFavorites = favorites.filter((id) => id !== itemId);

  Cookies.set("favorites", JSON.stringify(updatedFavorites));
};
