import React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slice/AuthSlice';
import { AppDispatch } from '../redux/store';
import { signOutScocialAccount } from '../config/SocialLoginConfig';
import { persistor } from '../redux/store';

interface LogoutDialogProps {
    visible: boolean;
    onDismiss: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ visible, onDismiss }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        signOutScocialAccount();
        dispatch(logoutUser());
        onDismiss();
        persistor.purge();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Confirm Logout</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Are you sure you want to logout?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button onPress={handleLogout}>Logout</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default LogoutDialog;
