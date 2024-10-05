import { StyleSheet, View } from "react-native";
import ProfileIcon from "./ProfileIcon";
import { Text } from "react-native";
import AppActions from "./AppActions";

interface AppHeaderProps {
    navigation: any;
    title: string;
}

const AppHeader : React.FC<AppHeaderProps> = ({ navigation, title }) => {
    return (
        <View style={styles.header}>
            <ProfileIcon navigation={navigation} />
            <Text style={styles.title}>{title}</Text>
            <AppActions navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },

    title: {
        fontSize: 20,
        color:'black',
        fontWeight: 'bold',
    },
});

export default AppHeader;