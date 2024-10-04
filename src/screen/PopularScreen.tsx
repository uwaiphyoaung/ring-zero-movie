import { useNavigation } from "@react-navigation/native";
import { PopularScreenNavigationProp } from "src/types/RootStackParamList";
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Modal, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "../redux/model/MovieModel";
import { useGetPopularQuery } from "../redux/services/MovieService";
import { AppDispatch, RootState } from "../redux/store";
import {setFavorite} from '../redux/slice/MovieSlice';
import { resetPages, setPopularPage } from "../redux/slice/PaginationSlice";
import { globalStyles } from "../utils/GeneralStyle";
import ErrorView from "../component/ErrorView";
import MovieItemCard from "../component/MovieItemCard";
import { generateRandomFiveDigitNumber } from "../utils/GeneratlUtil";
import { networkStatusCheck } from "../utils/NetworkStatusCheck";
import NoInternetWarning from "../component/NoInternetWarning";

const PopularScreen = () => {

    const navigation = useNavigation<PopularScreenNavigationProp>();

    const dispatch = useDispatch<AppDispatch>();

    const popularPage = useSelector((state:RootState)=> state.pagination.popularPage);

    const [movieList, setMovieList] = useState<Movie[]>([]);

    const isNetwork = networkStatusCheck();

    const loadMorePopular = () => {
        if(!popularFetching){
            dispatch(setPopularPage());
        }
    }

    const 
    {
        data: popularMovies,
        isLoading: popularLoading,
        isFetching: popularFetching,
        refetch: popularFetch,
        error: popularError
    } = useGetPopularQuery(popularPage);

    const favorites = useSelector((state: RootState) => state.movie.favorites)

    useEffect(()=>{
        if(popularMovies && popularMovies.results){
            setMovieList((old)=>[...old,...popularMovies.results]);
        }
    },[popularMovies]);

    const callRefresh = () => {
        popularFetch(); 
    
        if (!popularFetching) {
            setMovieList([]);
            dispatch(resetPages());
        }
    };

    useEffect(() => {
        if (!popularFetching && popularMovies?.results) {
            setMovieList((old)=>[...old,...popularMovies.results]);
        }
    
        if (popularError) {
            console.error("Error fetching upcoming movies", popularError);
        }
    }, [popularFetching, popularMovies, popularError]);

    if(popularError){
        if(isNetwork && movieList.length == 0){
            return <ErrorView visible={true} title="Something went wrong!" retry={callRefresh}/>;
        }
    }

    const FooterLoader = () => {
        if(popularPage>1 && popularFetching){
            return <ActivityIndicator style={{marginVertical:10}} size={'small'} color="#0000ff"/>;
        }else {
            return <View/>
        }
    }

    return (
        <View style={{flex:1}}>
            <NoInternetWarning visible={isNetwork}/>
            <FlatList
            data={movieList}
            renderItem={(movie)=>{
                const isFav = favorites.some((fav)=> fav.id === movie.item.id);
                return (
                <MovieItemCard
                        data={movie.item}
                        favorited={isFav}
                        onFavorite={()=>dispatch(setFavorite(movie.item))}
                        onClick={()=>{navigation.navigate('MovieDetail',{movie:movie.item})}}
                        />
                )
            }}
            keyExtractor={(item)=>item.id.toString().concat("popular").concat(generateRandomFiveDigitNumber().toString())}
            onEndReached={loadMorePopular}
            onEndReachedThreshold={0.5}
            ListFooterComponent={<FooterLoader/>}
            refreshing={popularLoading}
            onRefresh={callRefresh}
            initialNumToRender={10}
            windowSize={21}
            />
        </View>
    );
};

export default PopularScreen;