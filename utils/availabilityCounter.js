export const availabilityCounter = (itemAvailability) => {
  const availabilityArray = Object.values(itemAvailability).filter(
    (item) => typeof item === "boolean"
  );

  const count = availabilityArray.reduce((acc, value) => {
    if (value) acc += 1;
    return acc;
  }, 0);

  return count;
};
