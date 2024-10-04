import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import MainNavigation from "./MainNavigation";
import LoginNavigation from "./LoginNavigation";
import { loginSuccess } from "../redux/slice/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppNavigation = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const rehydrateAuth = async () => {
            const authState = await AsyncStorage.getItem('persist:auth');
            if (authState) {
                const parsedAuthState = JSON.parse(authState);
                if (parsedAuthState.isAuthenticated) {
                    dispatch(loginSuccess(parsedAuthState.user));
                }
            }
        };

        rehydrateAuth();
    }, [dispatch]);

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigation /> : <LoginNavigation />}
        </NavigationContainer>
    );
};

export default AppNavigation;