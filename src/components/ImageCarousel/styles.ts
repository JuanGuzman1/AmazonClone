import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {

  },
  image: {
    height: 250,
    resizeMode: 'contain',
    margin: 10,
  },
  dot:{
      width: 10,
      height: 10,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#c9c9c9',
      margin: 5
  },
  dots: {
      flexDirection: 'row',
      justifyContent: 'center',
  }
});

export default styles;
