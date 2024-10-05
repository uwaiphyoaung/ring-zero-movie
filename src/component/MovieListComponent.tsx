import { FlatList, ActivityIndicator, View} from "react-native";
import MovieItemCard from "./MovieItemCard";
import { generateRandomFiveDigitNumber } from "../utils/GeneratlUtil";
import ErrorView from "./ErrorView";
import { Movie } from "../redux/model/MovieModel";

interface MovieListComponentProps {
  movies: Movie[];
  loading: boolean;
  fetching: boolean;
  error: any;
  favorites: Movie[];
  isNetwork: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
  page: number;
}

const MovieListComponent = ({
  movies,
  loading,
  fetching,
  error,
  favorites,
  isNetwork,
  onLoadMore,
  onRefresh,
  onToggleFavorite,
  onMovieClick,
  page,
}: MovieListComponentProps) => {

  const FooterLoader = () => {
    if (page > 1 && fetching) {
      return <ActivityIndicator style={{ marginVertical: 10 }} size={"small"} color="#0000ff" />;
    } else {
      return <View />;
    }
  };

  if (error && isNetwork && movies.length === 0) {
    return <ErrorView visible={true} title="Something went wrong!" retry={onRefresh} />;
  }

  return (
    <View style={{ flex: 1 }}>

      <FlatList
        data={movies}
        renderItem={({ item: movie }) => {
          const isFav = favorites.some((fav) => fav.id === movie.id);
          return (
            <MovieItemCard
              data={movie}
              favorited={isFav}
              onFavorite={() => onToggleFavorite(movie)}
              onClick={() => onMovieClick(movie)}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString().concat(generateRandomFiveDigitNumber().toString())}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<FooterLoader />}
        refreshing={loading}
        onRefresh={onRefresh}
        initialNumToRender={10}
        windowSize={21}
      />
    </View>
  );
};

export default MovieListComponent;