const formatNumber = (n) => {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatAmount = (formattedValue, addDecimal = true) => {
  if (!formattedValue) return;
  formattedValue = formattedValue.replace(/^0+([1-9])/, "$1");
  formattedValue = formattedValue.replace(/^0{2}\./, "0.");
  formattedValue = formattedValue.replace(/^0+$/, "0");

  // check for decimal
  if (formattedValue.indexOf(".") >= 0) {
    const decimal_pos = formattedValue.indexOf(".");
    const left_side = formatNumber(formattedValue.substring(0, decimal_pos));
    const right_side = formattedValue
      .substring(decimal_pos)
      .replace(/\D/g, "")
      .substring(0, 2);
    formattedValue = left_side + "." + right_side;
  } else {
    formattedValue = formatNumber(formattedValue);
  }
  if (formattedValue.indexOf(".") < 0 && addDecimal) {
    formattedValue += ".00";
  }

  return formattedValue;
};
