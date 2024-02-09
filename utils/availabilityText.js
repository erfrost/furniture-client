export const availabilityText = (count) => {
  if (count === 0) return "Нет в наличии";
  else if (count === 1) return "В наличии в 1 городе";
  else if (count > 1) return `В наличии в ${count} городах`;
};
