import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';
import Pdf from 'react-native-pdf';
import plc from '../../assets/images/privacy-policy.png';

const TermsOfServiceScreen = ({route}) => {
  return (
    <ScrollView style={{backgroundColor: '#eee'}}>
      {route.params.type === 'shipping' && (
        <View style={styles.wrapper}>
          <Pdf
            source={{uri: 'bundle-assets://pdf/SHIPPING-POLICY.pdf'}}
            style={styles.pdf}
            // singlePage={true}
            spacing={1}
          />
        </View>
      )}
      {route.params.type === 'refund' && (
        <View style={styles.wrapper}>
          <Pdf
            source={{uri: 'bundle-assets://pdf/REFUND-POLICY.pdf'}}
            style={styles.pdf}
            // singlePage={true}
            spacing={1}
          />
        </View>
      )}
      {route.params.type === 'privacy' && (
        <View
          style={{
            width: Dimensions.get('window').width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pdf
            source={{uri: 'bundle-assets://pdf/PRIVACY-POLICY.pdf'}}
            style={[{width: '90%', aspectRatio: 1 / 1.4}]}
            // singlePage={true}
            spacing={1}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default TermsOfServiceScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height - 80,
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.greenBlue,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.mainTxt,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  des: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.description,
    textAlign: 'left',
    marginBottom: 6,
    lineHeight: 20,
  },
  link: {
    color: colors.green,
    lineHeight: 20,
    textAlignVertical: 'top',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  list: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.description,
    textAlign: 'left',
    marginBottom: 6,
    lineHeight: 20,
  },
  dot: {
    color: '#000',
  },
  highlight: {
    color: '#000',
    fontWeight: '500',
  },
  pdf: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '96%',
    height: Dimensions.get('window').height - 90,
  },
});
