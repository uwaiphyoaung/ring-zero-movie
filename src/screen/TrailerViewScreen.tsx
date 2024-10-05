import { View, StyleSheet, Dimensions } from 'react-native';
import { TrailerViewRouteProps } from 'src/types/RootStackParamList';
import React from 'react';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';

const TrailerViewScreen: React.FC<TrailerViewRouteProps> = ({route}) => {

  const { videoUrl } = route.params;
  const youtubeUrl = `https://www.youtube.com/embed/${videoUrl}`;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: youtubeUrl }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default TrailerViewScreen;
