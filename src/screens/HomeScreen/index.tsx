import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem';
import styles from './styles';

import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
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
