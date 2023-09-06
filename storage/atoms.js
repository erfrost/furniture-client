import { atom } from "recoil";

export const categoriesState = atom({
  key: "categoriesState",
  default: [],
});

export const subcategoriesState = atom({
  key: "subcategoriesState",
  default: [],
});

export const cartItemsState = atom({
  key: "cartItemsState",
  default: [],
});

export const favoriteState = atom({
  key: "favoriteState",
  default: [],
});

export const sortState = atom({
  key: "sortState",
  default: "none",
});
