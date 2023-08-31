import { selector } from "recoil";
import { categoriesState, searchItemsState, subcategoriesState } from "./atoms";

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

export const searchItemsSelector = selector({
  key: "searchItemsSelector",
  get: ({ get }) => get(searchItemsState),
  set: ({ set }, value) =>
    set(searchItemsState, (state) => ({ ...state, value: value })),
});
