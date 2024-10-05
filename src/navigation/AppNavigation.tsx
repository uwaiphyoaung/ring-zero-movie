import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MainNavigation from "./MainNavigation";
import LoginNavigation from "./LoginNavigation";
import SplashScreen from "../screen/SplashScreen";

const AppNavigation: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    const handleSplashFinish = () => {
        setIsLoading(false);
    };

    if (isLoading) {
        return <SplashScreen onFinish={handleSplashFinish} />;
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigation /> : <LoginNavigation />}
        </NavigationContainer>
    );
};

export default AppNavigation;