/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './src/router';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

import {StripeProvider} from '@stripe/stripe-react-native';

import {withAuthenticator} from 'aws-amplify-react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StripeProvider
        publishableKey={
          'pk_test_51J2o63INbXUH9eYLFjloZ8cYG2FIfyN1MH4ZVcsFyoWU8UAd3uBWQ4MSqS1lM8vEI4KIMnI4D7U2bsbK9KYbyUqG00jWqpajnU'
        }>
        <Router />
      </StripeProvider>
    </SafeAreaView>
  );
};

export default withAuthenticator(App);
