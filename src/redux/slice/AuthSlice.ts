import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: any|null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
}

const authState = createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>)=>{
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const {loginSuccess, logout} = authState.actions;

export default authState.reducer;