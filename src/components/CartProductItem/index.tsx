import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector';
import {DataStore} from 'aws-amplify';
import {CartProduct} from '../../models';
import styles from './styles';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    product: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  const {product, ...cartProduct} = cartItem;

  const updateQuantity = async(newQuantity: number) => {
    const original = await DataStore.query(CartProduct,cartProduct.id);
    await DataStore.save(CartProduct.copyOf(original,updated => {
      updated.quantity = newQuantity;
    }));
  }

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: cartItem.product.image,
          }}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {cartItem.product.title}
          </Text>
          {/*ratings*/}
          <View style={styles.ratingsContainer}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${cartItem.product.id}-${i}`}
                style={styles.star}
                name={
                  i < Math.floor(cartItem.product.avgRating) ? 'star' : 'star-o'
                }
                size={18}
                color={'#e47911'}
              />
            ))}
            <Text>{cartItem.product.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from ${cartItem.product.price}
            {cartItem.product.oldPrice && (
              <Text style={styles.oldPrice}> ${cartItem.product.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector quantity={cartProduct.quantity} setQuantity={updateQuantity} />
      </View>
    </View>
  );
};

export default CartProductItem;
