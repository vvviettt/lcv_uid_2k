import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';

const TermsOfServiceScreen = ({route}) => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {route.params.type === 'shipping' && (
          <>
            <Text style={styles.des}>
              {'  '}Shipping of the order from Alahas Diamante App is safe,
              secure and hassle free. All shipments are insured by our Insurance
              partner. Every package of product (Jewelry) purchased from{' '}
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL('https://www.alahasdiamante.com/');
                }}>
                alahasdiamante.com
              </Text>{' '}
              will reach to your doorstep in a durable condition and in a
              tamper-proof packing. Our courier partner is Fed-Ex and the
              shipping AWB no is provided after we ship the order via Email.
            </Text>
            <Text style={styles.title}>Shipping Charges</Text>
            <Text style={styles.des}>
              {'   '}
              We ship all order through trusted courier partner Fed-Ex and is
              chargeable depending upon destination country. The same shall be
              added in checkout process in billing and shipping information
              page.
            </Text>
            <Text style={styles.title}>Import Taxes and Duties:</Text>
            <Text style={styles.des}>
              {'   '}We ship the products from Dubai after completing all export
              documentation, however all shipments undergo custom clearance in
              each destination country. The custom clearance team of Fed-ex will
              complete all custom clearance formalities and if customer is
              liable to pay any import duty and taxes the same shall be informed
              by Fed-ex team to customer before delivery. Customer need to pay
              such amount before the taking the delivery. It is thereby advice
              to all our customers to check their country import rules, duties
              and taxes before placing the order.
            </Text>
            <Text style={styles.title}>Delivery to Identified Person</Text>
            <Text style={styles.des}>
              {'   '}Customer have to enter the correct details of Consignee /
              Recipient Name (as it is stated in their photo identification that
              is approved by the Government) with complete Address, nearby
              landmark, postal code and contact number for hassle free delivery.
            </Text>
            <Text style={styles.des}>
              {'   '}As the product reaches the destination, at the time of
              delivery, the recipient will have to provide any of the government
              recognized below identity proofs or address proof to collect the
              product:
            </Text>
            <Text style={styles.des}>
              {'   '} We make sure that delivery is made with the help of
              courier agent after checking the identity proof of the recipient
              and the courier agent confirms the same. To make sure that the
              delivery is safe and secured, the courier agent will note down
              details of the recipient's identity proof. During this process,
              the receiver is expected to cooperate with the agent by providing
              with original copies of identity proof.
            </Text>

            <Text style={styles.title}>Delivery Location:</Text>
            <Text style={styles.des}>
              {'   '}Orders can be delivered to only Residential, Commercial
              Location only. The delivery of the orders cannot be done to any
              public places like Mall, Hotel, Restaurant, Hostel, On Road etc.
            </Text>
            <Text style={styles.des}>
              {'   '}If at all the recipient is unavailable during the time of
              delivery, Courier Company will try making 3 attempts to deliver
              the product. In case you are still not reachable/ available, the
              same will be returned to our office from where the product has
              been dispatched (Dubai). In case customer does not accept the
              delivery the return shipping charges along with Import duty in
              Dubai will be borne by customer and same shall be deducted from
              customer amount. So please make sure your availability during
              delivery of the shipment.
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL('https://www.malabargoldanddiamonds.com/');
                }}>
                www.alahasdiamante.com
              </Text>{' '}
              holds the right to change this policy at any time without prior
              notice. In the event that any changes are made, the revised policy
              shall be posted on this website.
            </Text>
          </>
        )}
        {route.params.type === 'refund' && (
          <>
            <Text style={styles.title}>No Questions Asked Refund Policy</Text>
            <Text style={styles.des}>
              {'   '}If the customer wishes to return our product, he/she can do
              so within 14 days. We will ensure that the entire amount is
              refunded to the customer’s account within 10 working days. Below
              mentioned conditions are applicable for refund.
            </Text>
            <Text style={styles.des}>
              {'   '} If the customers do not like our product, he/ she can send
              the product back to us within 14days. We will make sure to refund
              the entire amount back to customer’s account within 10 working
              days.
            </Text>
            <Text style={styles.des}>
              {'   '}Refund request can be done by informing our customer care
              team via email or call. We will send you a reverse packing kit, in
              which you need to pack the product as it was delivered to you and
              ship the product back to us at your own cost. Once the product is
              received and successfully undergoes the quality check, the refund
              shall be done.
            </Text>
            <Text style={styles.des}>
              {'   '}This refund is subject to quality confirmation by our
              skilled quality assurance team and on verification that the
              packaging of the same is complete with all the documents like
              insurance certificate, original invoice and product certificate.
            </Text>
            <Text style={styles.title}>Diamond and Precious Gem Jewelry</Text>
            <Text style={styles.des}>
              {'   '}Diamond and precious gem jewelry purchased from our online
              store can be exchanged through online in GCC countries. Below are
              the terms and condition for the exchange:
            </Text>
            <Text style={styles.des}>
              {'   '}
              Exchange done within 15 days:
            </Text>
            <Text style={styles.list}>
              <Text style={styles.dot}>-</Text> {'  '}Diamond and precious gem
              jewelry purchased from Alahas Diamante online store in the GCC can
              be exchanged within 15 days from the invoice date against diamond
              and precious gem jewelry only without any loss in value. Only one
              such exchange will be permitted against an invoice.
            </Text>
            <Text style={styles.des}>
              {'   '}
              Exchange done After 15 days:
            </Text>
            <Text style={styles.list}>
              <Text style={styles.dot}>-</Text> {'  '}
              Against Diamond and Precious Gem Jewelry:
            </Text>
            <Text style={styles.des}>
              {'     '}
              In case of exchange with diamond and precious gem jewelry after 15
              days, the price calculation for the returning item will be either
              (a) 80% of the total invoice value or (b) 100% of the prevailing
              gold price + 80% of prevailing diamond price, whichever (a or b)
              is higher.``
            </Text>
            <Text style={styles.list}>
              <Text style={styles.dot}>-</Text> {'  '}
              Against Gold Jewelry:
            </Text>
            <Text style={styles.des}>
              {'     '}
              In case of exchange against gold jewelry, the valuation of
              returning stock would be either (a) 70% of the total invoice value
              or (b) 96% of the prevailing gold value + 70% of the prevailing
              diamond price, whichever (a or b) is higher.
            </Text>
          </>
        )}
        {route.params.type === 'privacy' && (
          <>
            <Text style={styles.mainTitle}>
              WE REQUEST YOU TO REFER THE BELOW TERMS OF OUR PRIVACY POLICY
            </Text>
            <Text style={styles.title}>
              PERSONAL INFORMATION THAT ARE COLLECTED
            </Text>

            <Text style={styles.des}>
              {'   '}We usually collect personal information like name, email
              id, contact number and such other details during the process of
              setting up an account with{' '}
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL('https://www.alahasdiamante.com/');
                }}>
                alahasdiamante.com
              </Text>
              . When browsing a few sections of site without you being a
              registered member, you will not be able to place an order. We use
              your contact details so that we can intimate you about the timely
              offers, which are based on the previous orders and also depends on
              your interest.
            </Text>
            <Text style={styles.title}>USE OF INFORMATION</Text>

            <Text style={styles.des}>
              {'   '}We make use of the personal details for providing you with
              service requests. For various purposes like troubleshooting
              problems, collection of fees, for surveys and for providing
              information on various offers, we need your personal information.
              We also collect and analyze the demographic and profile data about
              users activity in our website. We make sure to identify and use
              the IP address for diagnosing problems in our website.
            </Text>
            <Text style={styles.title}>SECURITY PRECAUTIONS</Text>
            <Text style={styles.des}>
              {'   '}Our site is featured with strict security measures and due
              to this, we help in protecting the loss, alteration and misuse of
              information under our control. If in case you want to change your
              access of personal account information, we make sure to provide
              with secure server. Once the information is with us, we make sure
              to adhere to the stringent security guidelines and protect the
              same against unauthorized access.
            </Text>
            <Text style={styles.title}>CHOICE/OPT-OUT</Text>
            <Text style={styles.des}>
              {'   '}
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL('https://www.alahasdiamante.com/');
                }}>
                alahasdiamante.com
              </Text>{' '}
              provides to all the users with a chance of opting out of
              promotional and marketing related services from us on behalf of
              our partners, after you set up an account.
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default TermsOfServiceScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 18,
    paddingVertical: 18,
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
});
