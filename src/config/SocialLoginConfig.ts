import { CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

export const configureGoogleLogin = () => {
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
        offlineAccess: true,
        forceCodeForRefreshToken: true,
        iosClientId: Platform.OS === 'ios'? CLIENT_ID: undefined
    })
}

export const signOutScocialAccount = async () => {
    try {
        await GoogleSignin.signOut();
        LoginManager.logOut();
    }catch (error){
        console.error(error);
    }
}

export const facebookLogin = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            return "Facebook login canceled";
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            return "Failed to get user data from Facebook";
        }
        return data;
    } catch (error) {
        return 'Error with Facebook Login';
    }
};