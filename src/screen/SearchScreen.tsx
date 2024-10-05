import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSearchMoviesQuery } from "../redux/services/MovieService";
import { setFavorite } from "../redux/slice/MovieSlice";
import { networkStatusCheck } from "../utils/NetworkStatusCheck";
import SearchBar from "../component/SearchBar";
import NoInternetWarning from "../component/NoInternetWarning";
import MessageView from "../component/MessageView";
import MovieListComponent from "../component/MovieListComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList";

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [movies, setMovies] = useState<any[]>([]);

  const favorites = useSelector((state: RootState) => state.movie.favorites);
  const isNetwork = networkStatusCheck();

  const { data, error, isLoading, isFetching } = useSearchMoviesQuery(
    { query: submittedQuery, page },
    { skip: !submittedQuery || !isNetwork }
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

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      setSubmittedQuery(searchQuery);
      setPage(1);
    } else {
      setMovies([]);
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setSubmittedQuery('');
    setMovies([]);
  };

  const loadMore = () => {
    if (!isFetching && hasMore && isNetwork) {
      setPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSearch={handleSearch}
        onClear={handleSearchClear}
        onBack={handleBack} 
      />

      {!isNetwork && <NoInternetWarning visible={true} position={50} />}

      <View style={styles.body}>
        {(!submittedQuery && !isLoading) && (
          <MessageView icon="search" title="Search" message="Discover and explore your favorite movies." />
        )}

        {error && <MessageView title="Error" message="Something went wrong!" icon="error" />}

        {data?.results.length === 0 && submittedQuery && <MessageView title="No Results" message="No movies found." icon="movie" />}

        <MovieListComponent
          movies={movies}
          loading={isLoading}
          fetching={isFetching}
          error={error}
          favorites={favorites}
          isNetwork={isNetwork}
          onLoadMore={loadMore}
          onRefresh={() => handleSearch()}
          onToggleFavorite={(movie) => dispatch(setFavorite(movie))}
          onMovieClick={(movie) => navigation.navigate('MovieDetail', { movie })}
          page={page}
        />
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
});

export default SearchScreen;