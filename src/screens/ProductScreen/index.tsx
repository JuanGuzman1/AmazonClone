import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, ActivityIndicator} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {useRoute} from '@react-navigation/core';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';
import {useNavigation} from '@react-navigation/native';

interface componentNameProps {}

const ProductScreen = (props: componentNameProps) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, []);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if(!product || !userData){
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: route.params.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/*image carousel */}
      <ImageCarousel images={product.images} />

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
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>
      {/*description */}
      <Text style={styles.description}>{product.description}</Text>
      {/*quantity selector*/}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      {/*button*/}
      <Button text={'Add To Cart'} onPress={onAddToCart} />
      <Button text={'Buy Now'} onPress={() => {}} />
    </ScrollView>
  );
};

export default ProductScreen;
