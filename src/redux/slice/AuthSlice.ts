import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import { LoginUser } from '../model/LoginUserModel';

interface AuthState {
    isAuthenticated: boolean;
    user: LoginUser | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<LoginUser>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (user: LoginUser) => async (dispatch: any) => {
    await Keychain.setGenericPassword(user.socialId, JSON.stringify(user));

    dispatch(loginSuccess(user));
};

export const logoutUser = () => async (dispatch: any) => {
    await Keychain.resetGenericPassword();
    dispatch(logout());
};

export const checkLogin = () => async () => {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
        const user: LoginUser = JSON.parse(credentials.password);
        return user;
    }
    return null;
};

export default authSlice.reducer;