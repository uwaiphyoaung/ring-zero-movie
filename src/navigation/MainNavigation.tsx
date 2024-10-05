import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetail from '../screen/MovieDetail';
import MovieTabNavigation from "./MoviesTabNavigation";
import { RootStackParamList } from "../types/RootStackParamList";
import SearchScreen from "../screen/SearchScreen";
import AppHeader from "../component/AppHeader";
import ImageViewScreen from "../screen/ImageViewScreen";
import TrailerViewScreen from "../screen/TrailerViewScreen";
import ProfileScreen from "../screen/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='MovieTabNavigation'>

            <Stack.Screen
                options={({ navigation}) => ({
                    header: () => <AppHeader navigation={navigation} title="Movies Explorer App"/>
                })}
                name='MovieTabNavigation'
                component={MovieTabNavigation}
            />

            <Stack.Screen
                options={() => ({
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

            <Stack.Screen
                options={{
                    title:''
                }}
                name="ImageViewScreen"
                component={ImageViewScreen}
            />

            <Stack.Screen
                options={{
                    title:'Trailer'
                }}
                name='TrailerViewScreen'
                component={TrailerViewScreen}
            />

            <Stack.Screen
                options={{
                    title:'Profile'
                }}
                name='ProfileScreen'
                component={ProfileScreen}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;
