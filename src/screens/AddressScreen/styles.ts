import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
      padding: 10,
  },
  row: {
    marginVertical: 5,
  },
  label:{
    fontWeight: 'bold',
  },
  input:{
    height: 40,
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 2,
  },
  addressError:{
    color: 'red'
  }
});

export default styles;
