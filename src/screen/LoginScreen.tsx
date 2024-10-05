import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { statusCodes } from "@react-native-google-signin/google-signin";
import { configureGoogleLogin, facebookLogin } from "../config/SocialLoginConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { login, loginSuccess } from "../redux/slice/AuthSlice";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleIcon } from "../component/memoizing/MemoizedIcons";
import { Snackbar } from 'react-native-paper';
import { LoginUser } from "../redux/model/LoginUserModel";

const LoginScreen = () => {
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        configureGoogleLogin();
    }, []);

    const showErrorMsg = (msg: string) => {
        setSnackbarMessage(msg);
    };

    const clearError = () => {
        setSnackbarMessage("");
    }

    const loginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.data) {
                const user: LoginUser = {
                    socialId: userInfo.data?.user.id??"",
                    email: userInfo.data?.user.email,
                    name: userInfo.data?.user.name,
                };
                dispatch(login(user));
            } else {
                showErrorMsg("You canceled the Google Sign In.");
            }
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                showErrorMsg("You canceled the Google Sign In.");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                showErrorMsg("Processing Google Sign In.");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                showErrorMsg("Google Play services not available on your device.");
            } else {
                showErrorMsg("Error occurred while accessing your account!");
            }
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const message = await facebookLogin();
            if (typeof message === 'string') {
                showErrorMsg(message);
            } else {
                const userInfoResponse = await fetch(`https://graph.facebook.com/me?access_token=${message.accessToken}&fields=id,name,email`);
                const userInfo = await userInfoResponse.json();

                if (userInfo) {
                    const user: LoginUser = {
                        socialId: userInfo.id,
                        email: userInfo.email,
                        name: userInfo.name,
                    };

                    dispatch(loginSuccess(user));
                } else {
                    showErrorMsg("Failed to fetch user information.");
                }
            }
        } catch (error) {
            console.error(error);
            showErrorMsg("Facebook Login Error");
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>Welcome!</Text>
                <Text style={styles.paragraph}>Sign in to Movie Explorer App to discover and explore your favorite movies</Text>
                <TouchableOpacity onPress={loginWithGoogle}>
                    <View style={styles.loginBtnContainer}>
                        <GoogleIcon width={22} />
                        <Text style={styles.loginBtnText}>Sign in with Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookLogin}>
                    <View style={styles.loginBtnContainer}>
                        <MaterialCommunityIcons name="facebook" size={22} color={"#4285f4"} />
                        <Text style={styles.loginBtnText}>Sign in with Facebook</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.version}>Version: 1.0.0</Text>
            <Snackbar
                visible={snackbarMessage.length > 0}
                onDismiss={clearError}
                duration={3000}
                action={{ label: 'Dismiss', onPress: clearError }}>
                {snackbarMessage}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20
    },
    header: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    paragraph: {
        fontSize: 14,
        marginBottom: 25
    },
    loginBtnContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 23,
        marginBottom: 15
    },
    loginBtnText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#595d60'
    },
    version: {
        alignSelf: 'center',
        paddingVertical: 20
    }
});

export default LoginScreen;