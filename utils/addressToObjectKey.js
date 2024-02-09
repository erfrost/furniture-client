export const addressFormatToObjetKey = (address) => {
  if (address === "Г. Нижневартовск МЦ Дом, Ул. Кузоваткина 3, стр. 9") {
    return "kuzovatkina3";
  } else if (address === "Г. Нефтеюганск Ул. Нефтяников, 87") {
    return "neftyanikov87";
  } else if (address === "Г. Лангепас Отдел Кухонька, Ул. Мира, 7") {
    return "mira7";
  }
};
