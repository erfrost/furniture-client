const formatItemsCount = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "товаров";
  } else if (lastDigit === 1) {
    return "товар";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return "товара";
  } else {
    return "товаров";
  }
};

export default formatItemsCount;
