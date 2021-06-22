import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import countryList from 'country-list';
import styles from './styles';
import Button from '../../components/Button';
import {DataStore, Auth, API, graphqlOperation} from 'aws-amplify';
import {Order, OrderProduct, CartProduct} from '../../models';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createPaymentIntent} from '../../graphql/mutations';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

interface componentNameProps {}

const countries = countryList.getData();

const AddressScreen = (props: componentNameProps) => {
  const [country, setCountry] = useState(countries[0].code);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [city, setCity] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const navigation = useNavigation();
  const route = useRoute();
  const amount = Math.floor(route.params?.totalPrice * 100 || 0);

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    }
  }, [clientSecret]);

  const fetchPaymentIntent = async () => {
    const response = await API.graphql(
      graphqlOperation(createPaymentIntent, {amount}),
    );
    setClientSecret(response.data.createPaymentIntent.clientSecret);
  };

  const initializePaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (error) {
      Alert.alert(error);
    }
  };

  const openPayment = async () => {
    if (!clientSecret) {
      return;
    }
    const {error} = await presentPaymentSheet({clientSecret});

    if (error) {
      Alert.alert(error);
    } else {
      saveOrder();
      Alert.alert('Success', 'Your order is confirmed');
    }
  };

  const saveOrder = async () => {
    //get user details
    const userData = await Auth.currentAuthenticatedUser();

    //create a new order
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        fullname: fullname,
        phoneNumber: phone,
        country,
        city: city,
        address,
      }),
    );
    //fetch all car items
    const cartItems = await DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    );
    //attach all the items to the order
    await Promise.all(
      cartItems.map(carItem =>
        DataStore.save(
          new OrderProduct({
            quantity: carItem.quantity,
            option: carItem.option,
            productID: carItem.productID,
            orderID: newOrder.id,
          }),
        ),
      ),
    );
    //delete all cart items
    await Promise.all(cartItems.map(carItem => DataStore.delete(carItem)));
    //redirect home
    navigation.navigate('Home');
  };

  const onCheckout = () => {
    if (!!addressError) {
      Alert.alert('Fix all field errors before submiting');
      return;
    }

    if (!fullname) {
      Alert.alert('Please fill the full name field');
      return;
    }

    if (!phone) {
      Alert.alert('Please fill the phone field');
      return;
    }
    openPayment();
  };

  const validateAddress = () => {
    if (address.length < 3) {
      setAddressError('Address is too short');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={30}>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Picker selectedValue={country} onValueChange={setCountry}>
            {countries.map(country => (
              <Picker.Item value={country.code} label={country.name} />
            ))}
          </Picker>

          {/*FULL NAME */}
          <View style={styles.row}>
            <Text style={styles.label}>Full name (First and Last name)</Text>
            <TextInput
              style={styles.input}
              placeholder={'Full name'}
              value={fullname}
              onChangeText={setFullname}
            />
          </View>

          {/*PHONE NUMBER */}
          <View style={styles.row}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder={'Phone number'}
              value={phone}
              onChangeText={setPhone}
              keyboardType={'phone-pad'}
            />
          </View>

          {/*ADDRESS */}
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder={'Address'}
              value={address}
              onEndEditing={validateAddress}
              onChangeText={text => {
                setAddress(text);
                setAddressError('');
              }}
            />
            {!!addressError && (
              <Text style={styles.addressError}>{addressError}</Text>
            )}
          </View>

          {/*CITY */}
          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder={'City'}
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>
        <Button text={'Checkout'} onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;
