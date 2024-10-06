import useSharedValue from "react-native-reanimated"

declare module 'react-native-reanimated' {
    const value: any;
    export default value;
  }