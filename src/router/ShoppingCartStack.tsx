import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

interface componentNameProps {}

const Stack = createStackNavigator();

const ShoppingCartStack = (props: componentNameProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShoppingCartScreen}
        name="cart"
        options={{title: 'Shopping cart'}}
      />
      <Stack.Screen
        component={AddressScreen}
        name="address"
        options={{title: 'Address'}}
      />
    </Stack.Navigator>
  );
};

export default ShoppingCartStack;
