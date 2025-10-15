export function formatAmount(amount: number) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumber(num: number) {
  if (isNaN(num)) return "";
  const [intPart, decPart] = num.toString().split(".");
  if (!decPart) return intPart; // integer
  if (decPart.length <= 6) return num.toString(); // already within 6 decimals
  return Number(num).toFixed(6); // trim to 6 decimals
}
