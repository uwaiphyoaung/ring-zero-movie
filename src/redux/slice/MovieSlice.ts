import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../model/MovieModel";

interface MovieState {
    favorites: Movie[];
}

const initialState: MovieState = {
    favorites: []
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setFavorite: (state, action: PayloadAction<Movie>) => {
            const isFavorite = state.favorites.find((item) => item.id === action.payload.id);
            if(isFavorite){
                state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
            }else{
                state.favorites.push(action.payload);
            }
        }
    }
});

export const {setFavorite} = movieSlice.actions;
export default movieSlice.reducer;