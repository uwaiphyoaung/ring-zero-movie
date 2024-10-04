
import React, { useEffect } from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import AppColors from './src/utils/ColorUtils';
import { Provider } from 'react-redux';
import { store,persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ApplicationDelegate, Settings } from 'react-native-fbsdk-next';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: AppColors.primary,
        accent: AppColors.accent
    }
};

const Main = () =>{

    useEffect(() => {
        if (Platform.OS === 'ios') {
            if(ApplicationDelegate){
                ApplicationDelegate.initializeSDK();
            }else{
                console.error("ApplicationDelegate not found")
            }
        }
        if (Platform.OS === 'android') {
            if(Settings){
                Settings.initializeSDK();
            }else{
                console.error("Setting not found");
            }
        }
    }, []);

    return (
        <PaperProvider theme={theme}>
            <PersistGate loading={null} persistor={persistor}>
                <Provider store={store}>
                    <App />
                </Provider>
                </PersistGate>
        </PaperProvider>
    )
};

AppRegistry.registerComponent(appName, () => Main);
