import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import UpcomingScreen from "../screen/UpcomingScreen";
import PopularScreen from "../screen/PopularScreen";

const Tab = createMaterialTopTabNavigator();

const MovieTabNavigation = () => {
    return (
        <Tab.Navigator>
                <Tab.Screen
                options={{ title: "Upcominig", tabBarLabelStyle: {textTransform:'capitalize', fontWeight:'700',fontSize:18}}}
                name="UpcomingScreen" component={UpcomingScreen}/>
                <Tab.Screen 
                options={{ title: "Popular", tabBarLabelStyle: {textTransform:'capitalize', fontWeight:'700',fontSize:18}}}
                name="PopularScreen" component={PopularScreen}/>
            </Tab.Navigator>
    );
};

export default MovieTabNavigation;