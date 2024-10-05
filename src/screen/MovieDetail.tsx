import { IMG_PATH } from "@env";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { setFavorite } from "../redux/slice/MovieSlice";
import { MovieDetalRouteProp } from "../types/RootStackParamList";
import { Title } from "react-native-paper";
import StarRating from "../component/RatingStar";
import { calculateFiveStarRating } from "../utils/GeneratlUtil";
import { useGetMovieTrailerQuery } from "../redux/services/MovieService";
import { Trailer } from "../redux/model/MovieModel";
import MovieCastList from "../component/MovieCastList";

interface MovieDetailProps {
    route: MovieDetalRouteProp
}
const MovieDetail : React.FC<MovieDetailProps> = ({route})=> {

    const dispatch = useDispatch<AppDispatch>()
    const movie = route.params.movie;
    const formattedRating: string = movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : "0.0";
    const favorites = useSelector((state: RootState) => state.movie.favorites)
    const isFav = favorites.some((fav)=> fav.id === movie.id);

    const makeFav = () => {
        dispatch(setFavorite(movie));
    }

    const {data: trailers} = useGetMovieTrailerQuery(movie.id);

    const trailer: Trailer | undefined = trailers?.results?.find(t=> t.type === "Trailer" && t.site === "Youtube");

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.posterBg}>
                <Image 
                style={styles.poster}
                source={{uri:`${IMG_PATH}/${movie.poster_path}`}}
                />
                {trailer && (
                    <Pressable style={styles.playBtn} onPress={()=>{}}>
                    <MaterialIcons name="play-arrow" size={30} color={'white'}/>
                </Pressable>
                )}
            </View>
            <Title style={styles.title}>{movie.title}</Title>
            <View style={styles.ratingFavContainer}>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{formattedRating}</Text>
                <StarRating
                movieId={movie.id}
                rating={calculateFiveStarRating(movie.vote_average??0,10)}/>
            </View>
            <TouchableOpacity
            onPress={makeFav}>
            <MaterialIcons name={"favorite"} size={30} color={isFav?"#f13806":"gray"}/>
            </TouchableOpacity>
            </View>
            <Text style={styles.description}>
            {movie.overview}
            </Text>
            <MovieCastList movieId={movie.id}/>
        </ScrollView>

        <View style={styles.footer}>
                <Text style={styles.total}>Price: 1,000B</Text>
                <Pressable style={styles.checkoutBtn} onPress={()=>{}}>
                    <Text style={styles.checkoutText}>Check Out</Text>
                </Pressable>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({

    container: {
        flex:1,
        padding: 5,
    },
    scrollView: {
        padding: 16,
        paddingBottom: 80
    },
    posterBg: {
        position:'relative',
        marginBottom:15,
    },
    poster: {
        width:'100%',
        height: 300,
        borderRadius: 10
    },
    playBtn: {
        position:'absolute',
        top:'50%',
        left:'50%',
        transform: [{translateX: -15}, {translateY: -15}],
        backgroundColor:"#007bff",
        borderRadius: 50,
        padding:10
    },
    title: {
        fontSize: 24,
        fontWeight:'bold',
        marginBottom: 10
    },
    ratingFavContainer: {
        flexDirection:'row',
        alignContent: 'center',
        marginBottom: 10,
        justifyContent:'space-between'
    },
    ratingContainer: {
        flexDirection:'row',
        alignItems:'center',
    },
    rating: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#f0ba09',
        marginRight: 10
    },
    description: {
        fontSize:14,
        marginBottom:10,
    },
    footer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    total: {
        fontSize:18,
    },
    checkoutBtn: {
        backgroundColor:'#007bff',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5
    },
    checkoutText: {
        color:'#fff',
        fontSize:16
    }

});

export default MovieDetail;