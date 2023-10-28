export const formatPhoneNumber = (prevState, phoneNumber) => {
  if (phoneNumber.length > 18) return prevState;

  const cleaned = phoneNumber.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

  if (match) {
    let formattedNumber = `+${match[1]}`;
    if (match[2]) {
      formattedNumber += ` (${match[2]}`;
    }
    if (match[3]) {
      formattedNumber += `) ${match[3]}`;
    }
    if (match[4]) {
      formattedNumber += `-${match[4]}`;
    }
    if (match[5]) {
      formattedNumber += `-${match[5]}`;
    }
    return formattedNumber;
  }

  return phoneNumber;
};
