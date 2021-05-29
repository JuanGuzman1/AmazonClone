import React, {useState, useCallback} from 'react';
import {FlatList, Text, View, Image, useWindowDimensions} from 'react-native';
import styles from './styles';

const ImageCarousel = ({images}: {images: string[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowsWidth = useWindowDimensions().width;

  const onFlatListUpdate = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: windowsWidth - 40}]}
            source={{uri: item}}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowsWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatListUpdate}
      />
      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : 'white',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
