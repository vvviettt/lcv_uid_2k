export const convertPrice = (priceString: string) => {
  const number = parseFloat(priceString);
  const currency = number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency.replace('$', '');
};
