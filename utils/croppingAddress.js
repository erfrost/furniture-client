export const croppingAddress = (address) => {
  const arr = address.split(" ");
  arr.length = 2;
  return arr.join(" ");
};
