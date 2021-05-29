import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  root: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#e3e3e3',
      width: 100,
      justifyContent: 'space-between'
  },
  button: {
      width: 25,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d1d1d1'
  },
  buttonText: {
    fontSize: 18,
  },
  quantity: {
    color: '#0072b9',
  }
});

export default styles;
