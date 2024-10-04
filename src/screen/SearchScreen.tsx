import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSearchMoviesQuery } from "../redux/services/MovieService";
import { setFavorite } from "../redux/slice/MovieSlice";
import { networkStatusCheck } from "../utils/NetworkStatusCheck";
import SearchBar from "../component/SearchBar";
import AppColors from "../utils/ColorUtils";
import NoInternetWarning from "../component/NoInternetWarning";
import MessageView from "../component/MessageView";
import MovieListComponent from "../component/MovieListComponent";
import { RootStackParamList, SearchRouteProp } from "../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

const SearchScreen: React.FC<SearchRouteProp>  = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [movies, setMovies] = useState<any[]>([]);

  const favorites = useSelector((state: RootState) => state.movie.favorites);
  const isNetwork = networkStatusCheck();

  const { data, error, isLoading, isFetching } = useSearchMoviesQuery(
    { query: searchQuery, page },
    { skip: !searchQuery || !isNetwork }
  );

  useEffect(() => {
    if (data && data.results) {
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((old) => [...old, ...data.results]);
      }
      setHasMore(data.results.length > 0);
    }
  }, [data]);

  const handleSearch = (keyword: string) => {
    setSearchQuery(keyword);
    setPage(1);
  };

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NoInternetWarning visible={isNetwork && movies.length > 0} position={50} />

      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} onBack={handleBack} />

      <View style={styles.body}>
        {(!searchQuery && !isLoading) && (
          <MessageView icon="search" title="Search" message="Discover and explore your favorite movies" />
        )}

        {error && <MessageView title="Error" message="Something went wrong" />}

        {data?.results.length === 0 && searchQuery && <MessageView title="No Results" message="No movie found" />}

        <MovieListComponent
          movies={movies}
          loading={isLoading}
          fetching={isFetching}
          error={error}
          favorites={favorites}
          isNetwork={isNetwork}
          onLoadMore={loadMore}
          onRefresh={() => handleSearch(searchQuery)}
          onToggleFavorite={(movie) => dispatch(setFavorite(movie))}
          onMovieClick={(movie) => navigation.navigate('MovieDetail', { movie })}
          page={page}
          fromHome={false}
        />

        {page > 1 && isLoading && (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="small" color={AppColors.primary} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchScreen;