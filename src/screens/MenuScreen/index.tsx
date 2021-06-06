import * as React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import Button from '../../components/Button';
import {Auth} from 'aws-amplify';

interface MenuScreenProps {}

const MenuScreen = (props: MenuScreenProps) => {
  const onLogout = () => {
    Auth.signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button text={'Sign out'} onPress={onLogout} />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {},
});
