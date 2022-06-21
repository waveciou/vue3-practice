const formatCurrency = (value: number): string => {
  let result = `${value}`;
  const reg = /(-?\d+)(\d{3})/;
  while (reg.test(result)) {
    result = result.replace(reg, '$1,$2');
  }
  return result;
};

export default formatCurrency;
