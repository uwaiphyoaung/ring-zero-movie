import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screen/LoginScreen";

const Stack = createStackNavigator();

const LoginNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            options={{headerShown:false}}
            name="LoginScreen" component={LoginScreen}/>
        </Stack.Navigator>
    );
    
};

export default LoginNavigation;