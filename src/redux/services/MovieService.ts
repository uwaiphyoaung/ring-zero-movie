import { API_KEY, BASE_URL } from "@env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cast, MovieDetail, MovieResponse, Trailer } from "../model/MovieModel";

export const movieApi = createApi({
    reducerPath:'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${BASE_URL}/`,
    }),
    tagTypes: ['Movies'],
    endpoints: (builder) => ({
        getUpComing: builder.query<MovieResponse, number>({
            query: (page=1) => `movie/upcoming?api_key=${API_KEY}&page=${page}`,
            providesTags: (result) =>
                result
            ? [
                ...result.results.map((movie) => ({ type: 'Movies' as const, id: movie.id })),
                { type: 'Movies' as const, id: 'UpComing' }
              ]
            : [{ type: 'Movies' as const, id: 'UpComing' }],
        }),
        getPopular: builder.query<MovieResponse, number>({
            query: (page=1) => `movie/popular?api_key=${API_KEY}&page=${page}`,
            providesTags: (result) =>
                result
            ? [
                ...result.results.map((movie) => ({ type: 'Movies' as const, id: movie.id })),
                { type: 'Movies' as const, id: 'Popular' }
              ]
            : [{ type: 'Movies' as const, id: 'Popular' }],
        }),
        getMovieDetail: builder.query<MovieDetail,number>({
            query: (id) => `movie/${id}?api_key=${API_KEY}`
        }),
        searchMovies: builder.query({
            query: ({ query, page }) => 
              `search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
            transformResponse: (response: any) => ({
              results: response.results,
              page: response.page,
              total_pages: response.total_pages,
            }),
        }),
        getMovieCredits: builder.query<{ cast: Cast[] }, number>({
          query: (movieId) => `movie/${movieId}/credits?api_key=${API_KEY}`,
        }),
        getMovieTrailer: builder.query<{ results: Trailer[] }, number>({
          query: (movieId) => `movie/${movieId}/videos?api_key=${API_KEY}`,
        }),
    })
});

export const { useGetUpComingQuery, useGetPopularQuery, useGetMovieDetailQuery, useSearchMoviesQuery, useGetMovieTrailerQuery, useGetMovieCreditsQuery} = movieApi

export default movieApi.reducer;