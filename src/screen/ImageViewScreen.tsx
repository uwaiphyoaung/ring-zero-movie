import { View, StyleSheet, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ImageViewRouteProps } from 'src/types/RootStackParamList';

const ImageViewScreen : React.FC<ImageViewRouteProps> = ({route}) => {

  const { imageUrl } = route.params;

  const images = [{ url: imageUrl }];

  return (
    <View style={styles.container}>
      <ImageViewer renderIndicator={()=><View></View>} imageUrls={images} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ImageViewScreen;
