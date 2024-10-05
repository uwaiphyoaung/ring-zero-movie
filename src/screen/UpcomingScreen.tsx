import { useNavigation } from "@react-navigation/native";
import { UpcomingScreenNavigationProp } from "../types/RootStackParamList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "../redux/model/MovieModel";
import { useGetUpComingQuery } from "../redux/services/MovieService";
import { AppDispatch, RootState } from "../redux/store";
import { setFavorite } from "../redux/slice/MovieSlice";
import { resetPages, setUpcomingPage } from "../redux/slice/PaginationSlice";
import { networkStatusCheck } from "../utils/NetworkStatusCheck";
import MovieListComponent from "../component/MovieListComponent";
import { View } from "react-native";
import NoInternetWarning from "../component/NoInternetWarning";

const UpcomingScreen = () => {
  const navigation = useNavigation<UpcomingScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const upcomingPage = useSelector((state: RootState) => state.pagination.upcomingPage);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const isNetwork = networkStatusCheck();

  const {
    data: upcomingMovies,
    isLoading: upcomingLoading,
    isFetching: upcomingFetching,
    refetch: upcomingFetch,
    error: upcomingError,
  } = useGetUpComingQuery(upcomingPage);

  const favorites = useSelector((state: RootState) => state.movie.favorites);

  const loadMoreUpcoming = () => {
    if (!upcomingFetching && isNetwork) {
      dispatch(setUpcomingPage());
    }
  };

  const callRefresh = () => {
    upcomingFetch();
    if (!upcomingFetching) {
      setMovieList([]);
      dispatch(resetPages());
    }
  };

  useEffect(() => {
    if (!upcomingFetching && upcomingMovies) {
      setMovieList((old) => [...old, ...upcomingMovies.results]);
    }
  }, [upcomingFetching, upcomingMovies]);

  return (
    <View style={{ flex: 1 }}>
      {!isNetwork && <NoInternetWarning visible={true} position={0} />}

      <MovieListComponent
        movies={movieList}
        loading={upcomingLoading}
        fetching={upcomingFetching}
        error={upcomingError}
        favorites={favorites}
        isNetwork={isNetwork}
        onLoadMore={loadMoreUpcoming}
        onRefresh={callRefresh}
        onToggleFavorite={(movie) => dispatch(setFavorite(movie))}
        onMovieClick={(movie) => navigation.navigate("MovieDetail", { movie })}
        page={upcomingPage}
      />
    </View>
  );
};

export default UpcomingScreen;