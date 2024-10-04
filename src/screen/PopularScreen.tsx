import { useNavigation } from "@react-navigation/native";
import { PopularScreenNavigationProp } from "../types/RootStackParamList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "../redux/model/MovieModel";
import { useGetPopularQuery } from "../redux/services/MovieService";
import { AppDispatch, RootState } from "../redux/store";
import { setFavorite } from "../redux/slice/MovieSlice";
import { resetPages, setPopularPage } from "../redux/slice/PaginationSlice";
import { networkStatusCheck } from "../utils/NetworkStatusCheck";
import MovieListComponent from "../component/MovieListComponent";

const PopularScreen = () => {
  const navigation = useNavigation<PopularScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const popularPage = useSelector((state: RootState) => state.pagination.popularPage);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const isNetwork = networkStatusCheck();

  const {
    data: popularMovies,
    isLoading: popularLoading,
    isFetching: popularFetching,
    refetch: popularFetch,
    error: popularError,
  } = useGetPopularQuery(popularPage);

  const favorites = useSelector((state: RootState) => state.movie.favorites);

  const loadMorePopular = () => {
    if (!popularFetching) {
      dispatch(setPopularPage());
    }
  };

  const callRefresh = () => {
    popularFetch();
    if (!popularFetching) {
      setMovieList([]);
      dispatch(resetPages());
    }
  };

  useEffect(() => {
    if (!popularFetching && popularMovies?.results) {
      setMovieList((old) => [...old, ...popularMovies.results]);
    }
  }, [popularFetching, popularMovies]);

  return (
    <MovieListComponent
      movies={movieList}
      loading={popularLoading}
      fetching={popularFetching}
      error={popularError}
      favorites={favorites}
      isNetwork={isNetwork}
      onLoadMore={loadMorePopular}
      onRefresh={callRefresh}
      onToggleFavorite={(movie) => dispatch(setFavorite(movie))}
      onMovieClick={(movie) => navigation.navigate("MovieDetail", { movie })}
      page={popularPage}
    />
  );
};

export default PopularScreen;