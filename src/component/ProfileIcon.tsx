import { StyleSheet, TouchableOpacity, View } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ProfileIconProps {
    navigation: any
}

const ProfileIcon: React.FC<ProfileIconProps> = ({navigation}) => {
    return (
        <TouchableOpacity
        onPress={()=> navigation.navigate('ProfileScreen')}>
            <View style={styles.container}>
                <MaterialIcons name="person" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container : {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 15
    }
});

export default ProfileIcon;