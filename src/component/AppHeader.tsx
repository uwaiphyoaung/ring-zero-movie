import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Menu, Dialog, Paragraph, Button, Portal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slice/AuthSlice';
import { AppHeaderProps } from '../types/RootStackParamList';
import { signOutScocialAccount } from '../config/SocialLoginConfig';
import { persistor } from '../redux/store';

const AppHeader: React.FC<AppHeaderProps> = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const dispatch = useDispatch();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openDialog = () => setDialogVisible(true);
    const closeDialog = () => setDialogVisible(false);

    const handleLogout = () => {
        signOutScocialAccount()
        dispatch(logout());
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
                    />
                </Menu>
            </View>

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={closeDialog}>
                    <Dialog.Title>Confirm Logout</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Are you sure you want to logout?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={closeDialog}>Cancel</Button>
                        <Button onPress={handleLogout}>Logout</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default AppHeader;