export default function formatCurrency(num) {
  return "€" + Number(num.toFixed(1)).toLocaleString() + " ";
  // return "\u20AC" + Number(num.toFixed(1)).toLocaleString() + " ";
}
