import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import { ActivityIndicator, Appbar, TextInput, Title } from "react-native-paper";
import { RootStackParamList, SearchRouteProp } from "../types/RootStackParamList";
import AppColors from "../utils/ColorUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSearchMoviesQuery } from "../redux/services/MovieService";
import MovieItemCard from "../component/MovieItemCard";
import { setFavorite } from "../redux/slice/MovieSlice";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { networkStatusCheck } from "../utils/NetworkStatusCheck";
import { generateRandomFiveDigitNumber } from "../utils/GeneratlUtil";
import NoInternetWarning from "../component/NoInternetWarning";
import { StackNavigationProp } from "@react-navigation/stack";

const SearchScreen: React.FC<SearchRouteProp> = ({route}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [searchQuery, setSearchQuery] = useState("");
    
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.movie.favorites)

    const [movies, setMovies] = useState<any[]>([]);

    const isNetwork = networkStatusCheck();

    const handleBack = () => {
        navigation.goBack();
    }

    const { data, error, isLoading, isFetching } = useSearchMoviesQuery(
        { query: searchQuery, page },
        { skip: !searchQuery || !isNetwork} 
      );

    useEffect(()=>{
        if(data && data.results){
            if(page===1){
                setMovies(data.results);
            }else{
                setMovies((old)=>[...old, ...data.results]);
            }
            setHasMore(data.results.length>0);
        }
    },[data]);

    const handleSearch = (keyword: string) => {
        setSearchQuery(keyword);
        setPage(1);
    };

    const loadMore = () => {
      if (!isFetching && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    const renderFooter = () => {
      if (!isFetching) return null;
      return <ActivityIndicator style={{marginVertical:10}} size="small" color={AppColors.primary} />;
    };

    return <View style={styles.container}>
        <NoInternetWarning visible={isNetwork && movies.length>0} position={50}/>
        <Appbar.Header
        style={styles.appBar} elevated>
            <Appbar.BackAction
            onPress={handleBack}/>
            <TextInput
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            style={styles.searchBox}
            contentStyle={styles.searchBoxText}
            placeholder="Search movie ..."
            cursorColor={AppColors.primary}
            multiline={false}
            numberOfLines={1}
            maxLength={50}
            autoFocus={true}
            value={searchQuery}
            onChangeText={handleSearch}/>
        </Appbar.Header>

        <View style={styles.body}>

            {(!searchQuery && !isLoading) && (
            <View style={styles.messageContainer}>
                <MaterialIcons name="search" size={60}/>
                <Title style={{fontSize:22, fontWeight:'400', marginBottom:20}}>Search</Title>
                <Text style={styles.messageText}>Discover and explore your favorite movies</Text>
            </View>
            )}

            {error && (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>Something went wrong</Text>
            </View>
            )}

            {data?.results.length === 0 && searchQuery && (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>No movie found</Text>
            </View>
            )}

            <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString().concat("search").concat(generateRandomFiveDigitNumber().toString())}
            renderItem={({ item }) => {
                const isFav = favorites.some((fav)=> fav.id === item.id);
                return (
                    <MovieItemCard
                    data={item}
                    favorited={isFav}
                    onFavorite={()=>dispatch(setFavorite(item))}
                    onClick={() => navigation.navigate('MovieDetail', { movie: item })}
                    />
                )
            }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            initialNumToRender={10}
            windowSize={21}
            />

            {page>1 && isLoading && (
            <View style={styles.messageContainer}>
                <ActivityIndicator size="small" color={AppColors.primary} />
            </View>
            )}
        </View>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    appBar: {
      backgroundColor: "#fff",
      height: 57,
    },
    searchBox: {
      flex: 1,
      backgroundColor: "transparent",
    },
    searchBoxText: {
      fontSize: 18,
    },
    body: {
        flex:1,
    },
    messageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    messageText: {
      fontSize: 18,
      color: "gray",
    },
});

export default SearchScreen;