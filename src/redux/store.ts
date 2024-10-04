import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';
import { movieApi } from '../redux/services/MovieService';
import movieReducer from '../redux/slice/MovieSlice';
import paginationReducer from '../redux/slice/PaginationSlice';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";

const moviePersistConfig = {
    key: 'movie',
    storage: AsyncStorage,
    whitelist: ['movie']
};

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['auth']
};

const persistedMovieReducer = persistReducer(moviePersistConfig, movieReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        pagination: paginationReducer,
        movie: persistedMovieReducer,
        [movieApi.reducerPath]: movieApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(movieApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);