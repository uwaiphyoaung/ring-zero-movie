import React from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

jest.mock('@react-native-async-storage/async-storage');

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));

jest.mock('react-native-paper', () => ({
    ...jest.requireActual('react-native-paper'),
    Snackbar: jest.fn(({ children }) => <View>{children}</View>),
  }));

  jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  hasPlayServices: jest.fn(),
  signIn: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('@env', () => ({
    CLIENT_ID: '',
    WEB_CLIENT_ID: '',
  }));

  jest.mock('@react-native-google-signin/google-signin', () => ({
    GoogleSignin: {
      configure: jest.fn(),
      signIn: jest.fn(() => Promise.resolve({ user: { email: 'waiphyoaung@gmail.com' } })),
      signOut: jest.fn(),
    },
  })); 

jest.mock('react-native-fbsdk-next', () => ({
    AccessToken: {
      getCurrentAccessToken: jest.fn().mockResolvedValue(null),
    },
    LoginManager: {
      logInWithPermissions: jest.fn().mockResolvedValue({ isCancelled: false }),
      logOut: jest.fn(),
    },
  }));
  
  jest.mock('@react-native-google-signin/google-signin', () => ({
    GoogleSignin: {
      configure: jest.fn(),
      hasPlayServices: jest.fn().mockResolvedValue(true),
      signIn: jest.fn().mockResolvedValue({
        user: {
          id: '123',
          email: 'waiphyoaung@gmail.com',
          name: 'Wai Phyo Aung',
        },
      }),
      signOut: jest.fn(),
    },
    statusCodes: {
      SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
      IN_PROGRESS: 'IN_PROGRESS',
      PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
    },
  }));
  
  jest.mock('react-native-webview', () => {
    const mockWebView = jest.fn().mockImplementation(() => null);
    return mockWebView;
  });
  
  jest.mock('react-native-gesture-handler', () => {
    return {
      ScrollView: jest.fn(),
    };
  });

  // jest.mock('react-native', () => {
  //   const ActualReactNative = jest.requireActual('react-native');
  //   return {
  //     ...ActualReactNative,
  //     View: (props: React.JSX.IntrinsicAttributes) => <ActualReactNative.View {...props} />,
  //     Text: (props: React.JSX.IntrinsicAttributes) => <ActualReactNative.Text {...props} />,
  //   };
  // });

//   jest.mock('react-native-reanimated', () => {
//     const Reanimated = require('react-native-reanimated/mock');
  
//     Reanimated.default = Reanimated;
//     return Reanimated;
//   });
  