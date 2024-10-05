import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AppDrawerHeaderProps {
    navigation: any
}

const AppDrawerHeader : React.FC<AppDrawerHeaderProps> = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.profileImage}>
                    <MaterialIcons name="person" size={50} />
                </View>
                <Text style={styles.accountName}>Wai Phyo Aung</Text>
                <Text style={styles.email}>waiphyoaung@gmail.com</Text>
            </View>
            <DrawerContentScrollView
            style={{flex: 1, top: 0, bottom: 0 }}
                >
                <View
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                }}>
                <View>
                    <DrawerItem label="Home" onPress={()=>{}} />
                    <DrawerItem label="Logout" onPress={()=>{}}/>
                </View>
                </View>
            </DrawerContentScrollView>
        <Text style={styles.version}>Version : 1.0.0</Text>
        </View>
        
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between'
    },
    container: {
        padding: 20,
        display:'flex',
        flexDirection:'column',
    },
    profileImage : {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:7
    },
    email: {
        fontSize: 14,
    },
    version: {
        padding:20
    }
});

export default AppDrawerHeader;
