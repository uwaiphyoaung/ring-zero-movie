import { Platform, StyleSheet} from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AppBackIconProps {
    navigation: any
}

const AppBackIcon: React.FC<AppBackIconProps> = ({navigation}) => {
    return (
        <MaterialIcons
        style={styles.container}
        name={Platform.OS==='android'?"arrow-back":"arrow-back-ios"}
        size={24} 
        onPress={() => navigation.goBack()}
        />
    );
};

const styles = StyleSheet.create({
    container : {
        marginLeft: 15
    }
});

export default AppBackIcon;