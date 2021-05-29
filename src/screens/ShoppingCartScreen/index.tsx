import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import styles from './styles';

import cart from '../../data/cart';

interface componentNameProps {}

const ShoppingCartScreen = (props: componentNameProps) => {
  const totalPrice = cart.reduce(
    (summedPrice, product) =>
      summedPrice + product.item.price * product.quantity,
    0,
  );

  return (
    <View style={styles.page}>
      {/*render product component*/}
      <FlatList
        data={cart}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        keyExtractor={({id}) => id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal ({cart.length} items):
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                {' '}
                ${totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button
              text={'Proceed to checkout'}
              onPress={() => console.warn('checkout')}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingCartScreen;
