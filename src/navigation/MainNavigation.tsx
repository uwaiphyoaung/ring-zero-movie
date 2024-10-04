import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetail from '../screen/MovieDetail';
import MovieTabNavigation from "./MoviesTabNavigation";
import { RootStackParamList } from "../types/RootStackParamList";
import SearchScreen from "../screen/SearchScreen";
import AppHeader from "../component/AppHeader";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='LoginScreen'>
            <Stack.Screen
                options={({ navigation }) => ({
                    title: "Movies Explorer App",
                    headerRight: () => <AppHeader navigation={navigation} />
                })}
                name='MovieTabNavigation'
                component={MovieTabNavigation}
            />

            <Stack.Screen
                options={({ navigation }) => ({
                    title: "Details",
                })}
                name='MovieDetail'
                component={MovieDetail}
            />

            <Stack.Screen
                options={{
                    title: "Search",
                    headerShown: false
                }}
                name='Search'
                component={SearchScreen}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;
