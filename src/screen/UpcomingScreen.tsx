import MovieItemCard from "../component/MovieItemCard";
import { useNavigation } from "@react-navigation/native";
import { UpcomingScreenNavigationProp } from "../types/RootStackParamList";
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "../redux/model/MovieModel";
import { useGetUpComingQuery } from "../redux/services/MovieService";
import { AppDispatch, RootState } from "../redux/store";
import {setFavorite} from '../redux/slice/MovieSlice';
import { resetPages, setUpcomingPage } from "../redux/slice/PaginationSlice";
import { globalStyles } from "../utils/GeneralStyle";
import ErrorView from "../component/ErrorView";
import { generateRandomFiveDigitNumber } from "../utils/GeneratlUtil";
import { networkStatusCheck } from "../utils/NetworkStatusCheck";
import NoInternetWarning from "../component/NoInternetWarning";

const UpcomingScreen = () => {

    const navigation = useNavigation<UpcomingScreenNavigationProp>();

    const dispatch = useDispatch<AppDispatch>();

    const upcomingPage = useSelector((state:RootState)=> state.pagination.upcomingPage);

    const [movieList, setMovieList] = useState<Movie[]>([]);

    const isNetwork = networkStatusCheck();

    const 
    {
        data: upcomingMovies,
        isLoading: upcomingLoading,
        isFetching: upcomingFetching,
        refetch: upcomingFetch,
        error: upcomingError
    } = useGetUpComingQuery(upcomingPage);

    const favorites = useSelector((state: RootState) => state.movie.favorites)

    const loadMoreUpcoming = () => {
        if(!upcomingFetching){
            dispatch(setUpcomingPage());
        }
    }

    const callRefresh = () => {
        upcomingFetch(); 
    
        if (!upcomingFetching) {
            setMovieList([]);
            dispatch(resetPages());
        }
    };

    useEffect(() => {
        if (!upcomingFetching && upcomingMovies) {
            setMovieList((old)=>[...old,...upcomingMovies.results]);
        }
    
        if (upcomingError) {
            console.error("Error fetching upcoming movies", upcomingError);
        }
    }, [upcomingFetching, upcomingMovies, upcomingError]);

    const FooterLoader = () => {
        if(upcomingPage>1 && upcomingFetching){
            return <ActivityIndicator style={{marginVertical:10}} size={'small'} color="#0000ff"/>;
        }else{
            return <View/>
        }
    }

    if(upcomingError){
        if(isNetwork && movieList.length == 0){
            return <ErrorView visible={true} title="Something went wrong!" retry={callRefresh}/>;
        }
    }

    return (
            <View style={styles.container}>
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
                keyExtractor={(item)=>item.id.toString().concat("upcoming").concat(generateRandomFiveDigitNumber().toString())}
                onEndReached={loadMoreUpcoming}
                onEndReachedThreshold={0.5}
                ListFooterComponent={<FooterLoader/>}
                refreshing={upcomingLoading}
                onRefresh={callRefresh}
                initialNumToRender={10}
                windowSize={21}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});

export default UpcomingScreen;
