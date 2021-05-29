import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';

interface componentNameProps {
  text: string;
  onPress: () => {};
}

const Button = ({text, onPress}) => {
  return (
  <Pressable onPress={onPress} style={styles.root}>
      <Text style={styles.text}>
          {text}
      </Text>
  </Pressable>);
};

export default Button;
