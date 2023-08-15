import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TermsOfServiceScreen = () => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.mainTitle}>Shipping Policy</Text>
        <Text style={styles.des}>
          {'  '}Shipping of the order from Alahas Diamante app is very safe,
          secure and hassle free. All our products are insured during the in
          transit by insurance company.
        </Text>
        <Text style={styles.des}>
          {'  '} Every package of product (Jewellery / Gold Coin) purchased from{' '}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL('https://www.malabargoldanddiamonds.com/');
            }}>
            www.malabargoldanddiamonds.com
          </Text>{' '}
          will reach to your doorstep in a durable condition and in a
          tamper-proof packing. Our courier partners are Bluedart, Ecom Express,
          Malca Amit and BVC. We will dispatch through any of these courier
          partners depending upon their serviceability in the shipping address.
        </Text>
        <Text style={styles.title}>Shipping Policy</Text>
        <Text style={styles.des}>
          {'   '}Shipping is FREE OF COST across all over India.
        </Text>
        <Text style={styles.title}>Delivery to Identified Person</Text>
        <Text style={styles.des}>
          {'   '}Customer needs to enter the correct details of Consignee /
          Recipient Name (as stated in their photo identification issued by the
          Government of India) with complete Address, nearby landmark, pin code
          and contact number for hassle free delivery. As the product reaches
          the destination, at the time of delivery, the recipient will have to
          provide any of the below mentioned identity proofs to collect the
          product:
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}Passport
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}PAN Card
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}Drivers License
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text>
          {'  '} Drivers License
        </Text>
        <Text style={styles.des}>
          We make sure that delivery is made with the help of courier agent
          after checking the identity proof of the recipient and the courier
          agent confirms the same. To make sure that the delivery is safe and
          secured, the courier agent will note down details of the recipient's
          identity proof. During this process, the receiver is expected to
          cooperate with the agent by providing with original copies of identity
          proof for identification.
        </Text>
        <Text style={styles.title}>Delivery Location:</Text>
        <Text style={styles.des}>
          {'   '}Orders can be delivered only to Consignee / Recipient’s
          Residential or Work Location or can be delivered to any nearby Malabar
          Gold and Diamonds Showroom in India. The delivery of the orders cannot
          be done at any public places like Mall, Hotel, Restaurant, Hostel, on
          street etc.
        </Text>
        <Text style={styles.des}>
          {'   '}If at all the recipient is unavailable during the time of
          delivery, Courier Company will try to make 3 attempts to deliver the
          product. In case you are still not reachable / available, the same
          will be returned to our facility in Mumbai.
        </Text>
        <Text style={styles.title}>Delivery Location:</Text>
        <Text style={styles.des}>
          {'   '}Orders can be delivered only to Consignee / Recipient’s
          Residential or Work Location or can be delivered to any nearby Malabar
          Gold and Diamonds Showroom in India. The delivery of the orders cannot
          be done at any public places like Mall, Hotel, Restaurant, Hostel, on
          street etc.
        </Text>
        <Text style={styles.des}>
          {'   '}If at all the recipient is unavailable during the time of
          delivery, Courier Company will try to make 3 attempts to deliver the
          product. In case you are still not reachable / available, the same
          will be returned to our facility in Mumbai.
        </Text>
        <Text style={styles.title}>Change in Shipping Address:</Text>
        <Text style={styles.des}>
          {'   '}- Customer can check the status & track their orders by logging
          into their My Account section of website.
        </Text>
        <Text style={styles.des}>
          {'   '}- Shipping details can even be changed at customer’s end. Once
          the order is created, customer can change shipping address only till
          the order is actually shipped from our facility. If customer wants to
          change shipping address, they should send an email to{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:care.in@malabargoldanddiamonds.com');
            }}
            style={styles.link}>
            care.in@malabargoldanddiamonds.com
          </Text>
          .
        </Text>
        <Text style={styles.des}>
          {'   '}Guarantee of the delivery of the product is subject to the
          terms and conditions of Courier Company. Any kind of discrepancy in
          the details of the receiver will result in the non-delivery of the
          product.
        </Text>
        <Text style={styles.des}>
          {'   '}Alahas Diamante app holds the right to change this policy at
          any time without prior notice. In the event that any changes are made,
          the revised policy shall be posted on this website.
        </Text>
        <Text style={styles.title}>Shipment Discrepancy</Text>
        <Text style={styles.des}>
          {'   '}After receiving your order, we advise you to carefully inspect
          the condition of the product. If you notice any damage to the product,
          identify a short or over-shipment, or suspect that part of the
          shipment has been lost, please contact malabargoldanddiamonds.com
          Customer Care Department immediately (within 72 hours) by calling{' '}
          <Text
            onPress={() => {
              Linking.openURL('tel:+971545905462');
            }}
            style={styles.link}>
            +971 545905462
          </Text>
          and sending an official email to{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:info@alahasdiamante.com');
            }}
            style={styles.link}>
            info@alahasdiamante.com
          </Text>
        </Text>
        <Text style={styles.title}>Damaged Products</Text>
        <Text style={styles.des}>
          {'   '}If you receive a damaged parcel or product, please contact{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:info@alahasdiamante.com');
            }}
            style={styles.link}>
            info@alahasdiamante.com
          </Text>{' '}
          customer service department within 72 hours by calling at{' '}
          <Text
            onPress={() => {
              Linking.openURL('tel:+91 22 62300916');
            }}
            style={styles.link}>
            +91 22 62300916
          </Text>{' '}
          and sending an email to care{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:info@alahasdiamante.com');
            }}
            style={styles.link}>
            info@alahasdiamante.com
          </Text>
          . Do not damage or discard the parcel or product. Our investigation
          team will investigate the complaint once we receive it by email and
          take appropriate action. If you fail to report the incident within 72
          hours of receiving the parcel, we will not accept responsibility for
          the damages, and no refund or complaint will be entertained.
        </Text>
        <Text style={styles.title}>Missing Products</Text>
        <Text style={styles.des}>
          {'   '}We urge you to inspect the parcel's condition before accepting
          it and ensure you report any issues within 72 hours of receiving the
          parcel. Please contact{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:info@alahasdiamante.com');
            }}
            style={styles.link}>
            info@alahasdiamante.com
          </Text>{' '}
          customer service department by calling +91 22 62300916 and sending an
          email to{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:info@alahasdiamante.com');
            }}
            style={styles.link}>
            info@alahasdiamante.com
          </Text>{' '}
          if you encounter any issues. Our investigation team will immediately
          look into the matter and provide a resolution within 7 working days.
          If you fail to report any issues within the specified time frame or do
          not follow the recommended inspection process before accepting the
          parcel, we will not be able to entertain any complaints.
        </Text>
        <Text style={styles.title}>Non receipt of an order</Text>
        <Text style={styles.des}>
          {'   '}At the time of dispatch, we provide the tracking ID of the
          shipment to the customer's registered email ID. It is the customer's
          responsibility to track the shipment and check for any updates. Once
          the shipment is delivered, we send a delivery confirmation to the
          registered email ID. If you do not receive the parcel physically after
          receiving our email, please contact our customer service department at{' '}
          <Text
            onPress={() => {
              Linking.openURL('tel:+91 22 62300916');
            }}
            style={styles.link}>
            +91 22 62300916
          </Text>{' '}
          or send an email to{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:info@alahasdiamante.com');
            }}
            style={styles.link}>
            info@alahasdiamante.com
          </Text>{' '}
          within 72 hours. Our investigation team will promptly address the
          issue and provide a resolution within 7 working days. However, please
          note that failure to report any issues within the specified time frame
          will result in us not being able to entertain any complaints. We will
          also not be able to issue any refunds to customers in case of any
          chargebacks raised to the bank without following the above process.
        </Text>
        <Text style={styles.mainTitle}>Cancellation Policy</Text>
        <Text style={styles.des}>
          {'   '}In case of any discrepancy we have the right to cancel any of
          the orders. A few reasons for cancellation from our end usually
          include limitation of the product in the inventory, error in pricing,
          error in product information etc. We also have the right to check out
          for extra information of the customer for the purpose of accepting
          orders in a few cases. We make sure to notify you if in case your
          order is cancelled partially or completely or if in case any extra
          data is required for the purpose of accepting your order.
        </Text>
        <Text style={styles.des}>
          {'   '}Once you place the order, it can be cancelled from your end
          before the product is dispatched. On receiving the cancellation
          request for ready for shipping product, we make sure to refund the
          amount through the same mode of payment within 10 working days. In
          case of cancellation pre-dispatch cancellation fees of 2% will be
          levied and balance 98% will be refunded back to the account. Gold coin
          order cancellation is not allowed under any circumstance.
        </Text>
        <Text style={styles.des}>
          {'   '}We don’t accept cancellation for Smart Buy (make to order) or
          customised jewellery products. In case customer wants the money back
          or wants to exchange it with other product(s), making charges and
          stone charges of the ordered product will be deducted from the payment
          and balance will be refunded back to customer account within 10
          working days or will be adjusted against the exchanged product(s).
        </Text>
        <Text style={styles.des}>
          {'   '}If in case the amount is deducted from customers account and
          the transaction has failed, the same will be refunded back to your
          account within 72 hours.
        </Text>
        <Text style={styles.mainTitle}>Refund Policy</Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}If the customer wishes to
          return our product, he/she can do so within 14 days{' '}
          <Text style={styles.highlight}>of receiving delivery</Text> . We will
          ensure that the entire amount is refunded to the customer’s account
          within 10 working days{' '}
          <Text style={styles.highlight}>
            after receiving the product back with us
          </Text>
          . Below mentioned conditions are applicable for refund. If the
          customers do not like our product, he/ she can send the product back
          to us within 14days. We will make sure to refund the entire amount
          back to customer’s account within 10 working days.
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}
          If the customers do not like our product, he/ she can send the product
          back to us within 14days. We will make sure to refund the entire
          amount back to customer’s account within 10 working days.
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}
          You can find registered address on{' '}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL('https://www.malabargoldanddiamonds.com/');
            }}>
            www.malabargoldanddiamonds.com
          </Text>{' '}
          and the refund will be applicable only if the product is shipped to
          the registered address within 14 days{' '}
          <Text style={styles.highlight}>of receiving delivery</Text> .
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}
          This refund facility is available only through{' '}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL('https://www.malabargoldanddiamonds.com/');
            }}>
            www.malabargoldanddiamonds.com
          </Text>{' '}
          and not through other stores in India
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}
          To initiate return, we would send a ‘Return Packaging Kit’ to the
          customer to pack the product in such packaging and handover the same
          to courier person. The whole reverse pick up procedure would take at
          least 7-10 working days. It is also advised to note down the courier
          airway bill number.
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}This refund is subject to
          quality confirmation by our skilled quality assurance team and on
          verification that the packaging of the same is complete with all the
          documents like insurance certificate, original invoice and product
          certificate.
        </Text>
        <Text style={styles.list}>
          <Text style={styles.dot}>-</Text> {'  '}
          14 days refund policy is not applicable for gold coins, silver
          articles, gold rakhi{' '}
          <Text style={styles.highlight}>
            and for products ordered with specific indications like smart buy
            (Make to Order), customization, engraving, personalised, gift cards,
            purchase using promotion code or by discount coupon.
          </Text>
        </Text>
        <Text style={styles.mainTitle}>Privacy Policy</Text>
        <Text style={styles.des}>
          {'   '}We know that you trust malabargoldanddiamonds.com. This is the
          reason we have set high standards for our secured transactions and
          adherence to the customer information privacy. Please note that our
          privacy policy will be subject to changes at any point in time without
          any prior notice.
        </Text>
        <Text style={styles.des}>
          {'   '}We request you to refer the below terms of our privacy policy.
        </Text>
        <Text style={styles.title}>Personal information that is collected</Text>
        <Text style={styles.des}>
          {'   '}
          We usually collect personal information like name, email id, contact
          number and such other details during the process of setting up an
          account with{' '}
          <Text
            onPress={() => {
              Linking.openURL('mailTo:info@alahasdiamante.com');
            }}
            style={styles.link}>
            info@alahasdiamante.com
          </Text>{' '}
          . When browsing a few sections of site without you being a registered
          member, you will not be able to place an order. We use your contact
          details so that we can intimate you about the timely offers, which are
          based on the previous orders and also depends on your interest.
        </Text>
        <Text style={styles.title}>Use of information</Text>
        <Text style={styles.des}>
          {'   '}We make use of the personal details for providing you with
          service requests. For various purposes like troubleshooting problems,
          collection of fees, for surveys and for providing information on
          various offers, we need your personal information. We also collect and
          analyze the demographic and profile data about users activity in our
          website. We make sure to identify and use the IP address for
          diagnosing problems in our website.
        </Text>
        <Text style={styles.title}>Security precautions</Text>
        <Text style={styles.des}>
          {'   '}Our site is featured with strict security measures and due to
          this, we help in protecting the loss, alteration and misuse of
          information under our control. If in case you want to change your
          access of personal account information, we make sure to provide with
          secure server. Once the information is with us, we make sure to adhere
          to the stringent security guidelines and protect the same against
          unauthorized access.
        </Text>
        <Text style={styles.title}>Choice/opt-out</Text>
        <Text style={styles.des}>
          {'   '}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL('https://www.malabargoldanddiamonds.com/');
            }}>
            malabargoldanddiamonds.com
          </Text>{' '}
          provides to all the users with a chance of opting out of promotional
          and marketing related services from us on behalf of our partners,
          after you set up an account.
        </Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.mainTxt,
    marginBottom: 10,
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
