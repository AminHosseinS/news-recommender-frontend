export const toPersianNumber = (value, withComma = false) => {
  if (value === null || value === undefined || value === "") return "";

  const num = Number(value);

  if (isNaN(num)) return value;

  return new Intl.NumberFormat("fa-IR", {
    useGrouping: withComma,
  }).format(num);
};
