import { selector } from "recoil";
import {
  cartItemsState,
  categoriesState,
  favoriteState,
  sortState,
  subcategoriesState,
} from "./atoms";

export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: ({ get }) => get(categoriesState),
  set: ({ set }, value) =>
    set(categoriesState, (state) => ({ ...state, value: value })),
});

export const subcategoriesSelector = selector({
  key: "subcategoriesSelector",
  get: ({ get }) => get(subcategoriesState),
  set: ({ set }, value) =>
    set(subcategoriesState, (state) => ({ ...state, value: value })),
});

export const cartItemsSelector = selector({
  key: "cartItemsSelector",
  get: ({ get }) => get(cartItemsState),
  set: ({ set }, value) =>
    set(cartItemsState, (state) => ({ ...state, value: value })),
});

export const favoriteSelector = selector({
  key: "favoriteSelector",
  get: ({ get }) => get(favoriteState),
  set: ({ set }, value) =>
    set(favoriteState, (state) => ({ ...state, value: value })),
});

export const sortSelector = selector({
  key: "sortSelector",
  get: ({ get }) => get(sortState),
  set: ({ set }, value) =>
    set(sortState, (state) => ({ ...state, value: value })),
});
