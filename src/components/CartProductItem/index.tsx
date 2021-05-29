import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector';
import styles from './styles';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
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
  const {quantity: quantityProp, id, option} = cartItem;
  const [quantity, setQuantity] = useState(quantityProp);
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: cartItem.item.image,
          }}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {cartItem.item.title}
          </Text>
          {/*ratings*/}
          <View style={styles.ratingsContainer}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${cartItem.item.id}-${i}`}
                style={styles.star}
                name={
                  i < Math.floor(cartItem.item.avgRating) ? 'star' : 'star-o'
                }
                size={18}
                color={'#e47911'}
              />
            ))}
            <Text>{cartItem.item.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from ${cartItem.item.price}
            {cartItem.item.oldPrice && (
              <Text style={styles.oldPrice}> ${cartItem.item.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </View>
    </View>
  );
};

export default CartProductItem;
