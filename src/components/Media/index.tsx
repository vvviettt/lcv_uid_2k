import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import mail from '../../assets/images/mail.png';
import whatsapp from '../../assets/images/whatsapp.png';

const Media = () => {
  const icons = [
    {
      icon: facebook,
      handle: () => {
        Linking.openURL('fb://profile/61550271264740/').catch(() => {
          Linking.openURL(
            'https://www.facebook.com/profile.php?id=61550271264740',
          );
        });
      },
    },
    {
      icon: instagram,
      handle: () => {
        Linking.openURL('instagram://user?username=alahasdiamante').catch(
          () => {
            Linking.openURL('https://www.instagram.com/alahasdiamante');
          },
        );
      },
    },
    {
      icon: whatsapp,
      handle: () => {},
    },
    {
      icon: mail,
      handle: () => {
        Linking.openURL('mailto:info@alahasdiamante.com');
      },
    },
  ];
  return (
    <View style={styles.wrapper}>
      {icons.map((item, index) => {
        return (
          <TouchableWithoutFeedback onPress={item.handle} key={index}>
            <Image style={styles.icon} source={item.icon} />
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default Media;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
    gap: 8,
    width: '100%',
  },
  icon: {
    width: 36,
    height: 36,
    marginHorizontal: 10,
    marginVertical: 8,
  },
});
