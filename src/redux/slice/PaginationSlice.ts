import { createSlice } from "@reduxjs/toolkit";

interface PaginationState {
    upcomingPage: number;
    popularPage: number;
}

const initialState: PaginationState = {
    upcomingPage: 1,
    popularPage: 1,
}


const paginationSlice = createSlice({
    name:'pagination',
    initialState,
    reducers: {
        setUpcomingPage: (state) => {
            state.upcomingPage = state.upcomingPage + 1;
        },
        setPopularPage: (state) => {
            state.popularPage = state.popularPage + 1;
        },
        resetPages: (state) => {
            state.popularPage = 1;
            state.upcomingPage = 1;
        }
    }
});


export const {setUpcomingPage, setPopularPage, resetPages}= paginationSlice.actions;

export default paginationSlice.reducer;