import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { checkLogin, loginSuccess } from '../redux/slice/AuthSlice';
import { LoginUser } from '../redux/model/LoginUserModel';
import { AppDispatch } from '../redux/store';

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const position = useSharedValue(400);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        position.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
        });

        const timer = setTimeout(async () => {
            const user: LoginUser | null = await dispatch(checkLogin());
            if (user) {
                dispatch(loginSuccess(user));
            }
            onFinish();
        }, 1500);

        return () => clearTimeout(timer);
    }, [position, onFinish, dispatch]);

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: position.value }],
        };
    },[position]);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, animatedTextStyle]}>Movie Explorer</Animated.Text>

            <ActivityIndicator size="large" style={styles.spinner}></ActivityIndicator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display:'flex',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    spinner: {
        marginTop: 30,
    },
});

export default SplashScreen;