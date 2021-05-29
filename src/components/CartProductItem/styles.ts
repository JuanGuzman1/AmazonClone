import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  image: {
    flex: 2,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  star: {
    margin: 2,
  },
  quantityContainer: {
    margin: 5,
  },
});

export default styles;
