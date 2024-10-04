import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface StarRatingProps {
  movieId: number;
  maxStars?: number;
  rating: number;
  starSize?: number;  
  starColor?: string;       
  emptyStarColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  movieId,
  maxStars = 5,
  rating,
  starSize = 16,
  starColor = '#f0ba09',    
  emptyStarColor = '#CCCCCC'
}) => {

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        return (
            <MaterialIcons
            key={starNumber+movieId+""}
            name={starNumber <= rating ? 'star' : 'star-border'}
            size={starSize}
            color={starNumber <= rating ? starColor : emptyStarColor}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
});

export default StarRating;
