export function comma(value) {
  if (value === 0) {
    return 0;
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
