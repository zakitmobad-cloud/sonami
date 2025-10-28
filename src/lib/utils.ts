/**
 * Format number/string so:
 * - < 1 : keep up to 6 decimals (truncate, keep leading zeros) e.g. 0.011 => "0.011"
 * - >=1 : show integer with commas and up to 6 decimals (truncate, trim trailing zeros)
 * - never round; always truncate to 6 decimals
 */
export function formatAmount(value: number | string): string {
  if (value === null || value === undefined || value === "") return "0";

  // normalize to string (if number may be in exponential form, convert to plain string)
  let s = typeof value === "number" ? Number(value).toString() : String(value);

  // handle negative
  let sign = "";
  if (s[0] === "-") {
    sign = "-";
    s = s.slice(1);
  }

  // if exponential notation, convert to non-exponential using BigInt-like approach
  // simple conversion for most reasonable numbers:
  if (s.toLowerCase().includes("e")) {
    // convert via Number -> fixed with high precision then trim trailing zeros
    // we use 18 decimals to be safe before truncation to 6
    s = Number(s)
      .toFixed(18)
      .replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  }

  // split integer and fractional parts
  let [intPart, fracPart = ""] = s.split(".");

  // strip any non-digit characters just in case
  intPart = intPart.replace(/^0+(?=\d)|[^\d]/g, (m, i) =>
    i === 0 && m === "0" ? "0" : ""
  );
  if (intPart === "") intPart = "0";

  // truncate fractional to max 6 digits (no rounding)
  if (fracPart.length > 6) {
    fracPart = fracPart.slice(0, 6);
  }

  // decide formatting rules
  if (Number(intPart) === 0) {
    // value < 1 (or something like 0.x)
    // keep leading zeros in fractional part, then trim trailing zeros
    // if fractional becomes empty => just "0"
    fracPart = fracPart.replace(/0+$/, ""); // trim trailing zeros
    if (fracPart === "") return "0";
    return `${sign}0.${fracPart}`;
  } else {
    // value >= 1
    // trim trailing zeros in fractional part
    fracPart = fracPart.replace(/0+$/, "");
    // add thousands separators to integer part
    const intWithCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (fracPart === "" || fracPart === undefined) {
      return `${sign}${intWithCommas}`;
    } else {
      return `${sign}${intWithCommas}.${fracPart}`;
    }
  }
}

export function formatNumber(num: number) {
  if (isNaN(num)) return "";
  const [intPart, decPart] = num.toString().split(".");
  if (!decPart) return intPart; // integer
  if (decPart.length <= 6) return num.toString(); // already within 6 decimals
  return Number(num).toFixed(6); // trim to 6 decimals
}
