import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from "./RatingStar";
import { Movie } from "../redux/model/MovieModel";
import { IMG_PATH } from "@env";
import { calculateFiveStarRating, formatDate } from "../utils/GeneratlUtil";

interface MovieItemCardProps {
    data: Movie;
    favorited: boolean;
    onFavorite: () => void;
    onClick: () => void;
}

class MovieItemCard extends React.PureComponent<MovieItemCardProps> {
    
    render() {
        const { data, favorited, onFavorite, onClick } = this.props;
        const formattedRating: string = data.vote_average !== undefined ? data.vote_average.toFixed(1) : "0.0";

        return (
            <TouchableOpacity onPress={onClick}>
                <View style={styles.cardContainer}>
                    <View style={styles.posterContainer}>
                        <Image 
                            style={styles.poster}
                            source={{ uri: `${IMG_PATH}/${data.poster_path}` }} 
                        />
                    </View>
                    <Card style={styles.content}>
                        <Card.Content>
                            <Title 
                                numberOfLines={1}
                                ellipsizeMode="tail" 
                                style={styles.title}
                            >
                                {data.title}
                            </Title>
                            <Paragraph
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={styles.paragraph}
                            >
                                {data.overview}
                            </Paragraph>
                            <View style={styles.releaseDateContainer}>
                                <MaterialIcons name={"calendar-month"} size={15} color={"gray"} />
                                <Paragraph style={styles.releaseDate}>
                                    {formatDate(data.release_date)}
                                </Paragraph>
                            </View>
                            <View style={styles.secondContainer}>
                                <View style={styles.ratingReviewContainer}>
                                    <Text style={styles.rating}>{formattedRating}</Text>
                                    <StarRating
                                        movieId={data.id}
                                        rating={calculateFiveStarRating(data.vote_average ?? 0, 10)}
                                        maxStars={5}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={{ padding: 10, alignItems: 'center' }}
                                    onPress={onFavorite}
                                >
                                    <MaterialIcons name={"favorite"} size={23} color={favorited ? "#f13806" : "gray"} />
                                </TouchableOpacity>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative', 
        paddingHorizontal: 10,
        marginTop: 10,
    },
    posterContainer: {
        width: 130,
        minHeight: 180,
        aspectRatio: 2 / 3,
        borderRadius: 2,
        position: 'absolute', 
        marginLeft: 15,
        marginBottom: 5,
        padding: 0,
        backgroundColor: '#dedcdc',
        left: 0,
        bottom: 0,
        zIndex: 1,
    },
    poster: {
        width: '100%',
        height: '100%',
        borderWidth: 3,
        borderColor: '#f0ba09',
    },
    content: {
        paddingLeft: 130,
        marginTop: 20,
        borderRadius: 2,
        paddingVertical: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
    },
    paragraph: {
        marginBottom: 5,
        fontWeight: '300',
        fontSize: 14,
    },
    secondContainer: {
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingReviewContainer: {
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
    },
    releaseDateContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    releaseDate: {
        fontSize: 14,
        fontWeight: '300',
    },
    rating: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f0ba09',
    },
});

export default MovieItemCard;