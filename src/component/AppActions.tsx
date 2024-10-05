import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Menu} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slice/AuthSlice';
import { AppHeaderProps } from '../types/RootStackParamList';
import { signOutScocialAccount } from '../config/SocialLoginConfig';
import { AppDispatch, persistor } from '../redux/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LogoutDialog from './LogoutDialog';

const AppActions: React.FC<AppHeaderProps> = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openDialog = () => setDialogVisible(true);
    const closeDialog = () => setDialogVisible(false);

    const handleLogout = () => {
        signOutScocialAccount()
        dispatch(logoutUser());
        closeDialog();
        persistor.purge(); 
    };

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <IconButton
                    icon="magnify"
                    onPress={() => navigation.navigate('Search')}
                />

                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <IconButton
                            icon="dots-vertical"
                            onPress={openMenu}
                        />
                    }
                >
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            openDialog();
                        }}
                        title="Logout"
                        trailingIcon={
                            () => <MaterialIcons name="logout" size={24} color="black" />
                        }
                    />
                </Menu>
            </View>

            <LogoutDialog visible={dialogVisible} onDismiss={closeDialog} />

        </>
    );
};

export default AppActions;