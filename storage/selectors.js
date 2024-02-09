import { selector } from "recoil";
import {
  availabilityFilterState,
  categoriesState,
  furnishersFilterState,
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

export const sortSelector = selector({
  key: "sortSelector",
  get: ({ get }) => get(sortState),
  set: ({ set }, value) =>
    set(sortState, (state) => ({ ...state, value: value })),
});

export const furnishersFilterSelector = selector({
  key: "furnishersFilterSelector",
  get: ({ get }) => get(furnishersFilterState),
  set: ({ set }, value) =>
    set(furnishersFilterState, (state) => ({ ...state, value: value })),
});

export const availabilityFilterSelector = selector({
  key: "availabilityFilterSelector",
  get: ({ get }) => get(availabilityFilterState),
  set: ({ set }, value) =>
    set(availabilityFilterState, (state) => ({ ...state, value: value })),
});
