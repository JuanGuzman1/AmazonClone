import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import styles from './styles';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

import {useNavigation} from '@react-navigation/core';

interface componentNameProps {}

const ShoppingCartScreen = (props: componentNameProps) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const navigation = useNavigation();

  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(setCartProducts);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    //query all products that are used in cart
    const fetchProducts = async () => {
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      //assign the products to the cart items
      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p.id === cartProduct.productID),
        })),
      );
    };

    fetchProducts();
  }, [cartProducts]);

  useEffect(() => {
    const subscription = DataStore.observe(CartProduct).subscribe(msg =>
      fetchCartProducts(),
    );
    return subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setCartProducts(curCartProducts =>
            curCartProducts.map(cp => {
              if (cp.id !== msg.element.id) {
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [cartProducts]);

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,
    0,
  );

  const onCheckout = () => {
    navigation.navigate('address',{totalPrice});
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.page}>
      {/*render product component*/}
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        keyExtractor={({id}) => id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal ({cartProducts.length} items):
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                {' '}
                ${totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button text={'Proceed to checkout'} onPress={onCheckout} />
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingCartScreen;
