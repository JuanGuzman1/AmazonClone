import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem';
import styles from './styles';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models';

//import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const results = await DataStore.query(Product);
      setProducts(results);
    };
    fetchProducts();
  }, []);

  return (
    <View style={styles.page}>
      {/*render product component*/}
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        keyExtractor={({id}) => id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
