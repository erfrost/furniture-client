export const sortedFurnishers = (furnishers) => {
  const result = furnishers.sort((a, b) => {
    const numberA = isNaN(Number(a.id[1]))
      ? Number(a.id[0])
      : Number(a.id[0] + a.id[1]);
    const numberB = isNaN(Number(b.id[1]))
      ? Number(b.id[0])
      : Number(b.id[0] + b.id[1]);

    if (numberA === numberB) {
      const letterA = a.id[a.id.length - 1];
      const letterB = b.id[b.id.length - 1];
      return letterA.localeCompare(letterB);
    }

    return numberA - numberB;
  });

  return result;
};
