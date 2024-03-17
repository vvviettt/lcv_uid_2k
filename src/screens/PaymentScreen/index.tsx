import WebView from 'react-native-webview';

const PaymentScreen = (data: any) => {
  console.log(Object.keys(data));
  const link = data.route.params.link;
  if (link) {
    return (
      <>
        <WebView source={{uri: link}} />
      </>
    );
  }
  return <></>;
};

export default PaymentScreen;
