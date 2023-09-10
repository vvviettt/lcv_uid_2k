export const getShippingStatus = (status: number) => {
  switch (status) {
    case 1:
      return 'Checking';
    case 2:
      return 'Shipping';
    case 3:
      return 'Completed';
    case 4:
      return 'cancel';
    default:
      return 'Unknown';
  }
};
