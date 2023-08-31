import { atom } from "recoil";

export const categoriesState = atom({
  key: "categoriesState",
  default: [],
});

export const subcategoriesState = atom({
  key: "subcategoriesState",
  default: [],
});

export const searchItemsState = atom({
  key: "searchItemsState",
  default: [],
});
