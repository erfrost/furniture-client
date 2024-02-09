import { atom } from "recoil";

export const categoriesState = atom({
  key: "categoriesState",
  default: [],
});

export const subcategoriesState = atom({
  key: "subcategoriesState",
  default: [],
});

export const sortState = atom({
  key: "sortState",
  default: "none",
});

export const furnishersFilterState = atom({
  key: "furnishersFilterState",
  default: [],
});

export const availabilityFilterState = atom({
  key: "availabilityFilterState",
  default: [],
});
