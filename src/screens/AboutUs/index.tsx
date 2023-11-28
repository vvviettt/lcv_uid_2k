import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';

const AboutUs = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>“Trust, Quality, Elegance”</Text>
        <Text style={styles.des}>
          {'   '}Alahas Diamante, a Dubai-UAE based and recently established
          company in the year 2024. Creating its own journey and passion which
          aiming to leave a mark as one of the world’s most reliable, economical
          and leading diamond online company. Primary goal is to understand each
          and every customer’s preference and bring a light-up smile and lasting
          satisfaction on every women’s face by not hurting anyone’s pocket.
        </Text>
        <Text style={styles.des}>
          {'   '} Alahas stands for Trust, Quality & Elegance, and our most
          important consideration is our customers, the TRUST they give to us is
          what fuels us a boost to create and invent unique jewellery pieces.
          Surrounded and worked with diamond expert people in the industry have
          influenced us to not create merely a jewellery but a jewellery made
          with QUALITY, being hands-on to each and every detail to meet or even
          top beyond our clients’ expectation. One of our main goals is to make
          sure every women has the ELEGANCE with their jewelleries on, to bring
          confidence and symbol of beauty that cannot be seen with the naked
          eye.
        </Text>
        <Text style={styles.des}>
          {'   '} Alahas Diamante is more focus and expert on Grown Diamonds,
          creating both classic & exclusive bespoke jewelleries to ensure the
          customers’ satisfaction and uniqueness as we cater worldwide no matter
          of wherever you are.
        </Text>
        <Text style={styles.title}>FUTURE GOAL</Text>
        <Text style={styles.des}>
          {'   '} Alahas Diamante future plan is to wide expand and be known as
          a leading brand worldwide especially in United Arab Emirates. To
          explore and create various unique economical jewellery pieces that are
          uncomparable in terms of cost and quality. Building more trust and
          lasting customer relationship base.{' '}
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '500',
    color: colors.mainTxt,
    marginBottom: 16,
  },
  des: {
    fontSize: 16,
    color: colors.description,
    marginBottom: 15,
    lineHeight: 21,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.mainTxt,
    marginBottom: 13,
  },
});
