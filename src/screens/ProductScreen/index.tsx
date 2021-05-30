import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import { useRoute } from '@react-navigation/core';

interface componentNameProps {}

const ProductScreen = (props: componentNameProps) => {
  const [selectedOption, setSelectedOption] = useState(
    product.options ? product.options[0] : null,
  );
  const [quantity, setQuantity] = useState(1);

  const route = useRoute();

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/*image carousel */}
      <ImageCarousel images={product.images}/>

      {/*option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>
      {/*price*/}
      <Text style={styles.price}>
        from ${product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
        )}
      </Text>
      {/*description */}
      <Text style={styles.description}>{product.description}</Text>
      {/*quantity selector*/}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      {/*button*/}
      <Button text={'Add To Cart'} onPress={() => {}} />
      <Button text={'Buy Now'} onPress={() => {}} />
    </ScrollView>
  );
};

export default ProductScreen;
