import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { LoginUser } from '../redux/model/LoginUserModel';
import { checkLogin } from '../redux/slice/AuthSlice';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import LogoutDialog from '../component/LogoutDialog';

interface ProfileScreenProps {
    navigation: any
}

const ProfileScreen : React.FC<ProfileScreenProps> = ({navigation}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [user,setUser] = useState<LoginUser|null>();
    const [dialogVisible, setDialogVisible] = useState(false);

    const fetchUser = async () => {
        const user: LoginUser | null = await dispatch(checkLogin());
        if (user) {
            setUser(user);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [dispatch]);

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.profileImgContainer}>
                    <View style={styles.profileImage}>
                        <MaterialIcons name="person" size={60} />
                    </View>
                </View>

                <View style={{height:20}}/>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{user?.name}</Text>

                <View style={{height:20}}/>
                <Text style={styles.label}>Email address</Text>
                <Text style={styles.value}>{user?.email}</Text>
            </ScrollView>
            <Button
            style={styles.logoutBtn}
            labelStyle={styles.logoutText}
            mode='outlined'
            onPress={()=>{setDialogVisible(true)}}>
                Logout
            </Button>
            <LogoutDialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} />
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
    profileImgContainer: {
        width: '100%',
        justifyContent:'center',
        flexDirection:'row'
    },
    profileImage : {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15
    },
    label: {
        fontSize: 14,
    },
    value: {
        marginTop:5,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:7
    },
    logoutBtn: {
        margin: 20
    },
    logoutText: {
        fontSize: 18,
    }
});

export default ProfileScreen;
