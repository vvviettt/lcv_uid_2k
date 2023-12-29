export const getShippingStatus = (status: number) => {
  switch (status) {
    case 1:
      return 'Confirmed';
    case 2:
      return 'ON DELIVERY';
    case 3:
      return 'DELIVERIED';
    case 4:
      return 'canceled';
    default:
      return 'Unknown';
  }
};
