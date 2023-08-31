export default function formattedNumber(number) {
  if (typeof number === "number") {
    return number.toLocaleString("ru-RU");
  }
  if (typeof number === "string") {
    return number.toString().toLocaleString("ru-RU");
  }
}
