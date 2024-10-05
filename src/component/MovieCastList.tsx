import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { IMG_PATH } from "@env";
import { useGetMovieCreditsQuery } from '../redux/services/MovieService';

const MovieCastList: React.FC<{ movieId: number }> = ({ movieId }) => {
  const { data, error, isLoading } = useGetMovieCreditsQuery(movieId);

  if (isLoading) {
    return <ActivityIndicator size={"large"}/>;
  }

  if (error) {
    return <Text>Error occurs while fetching actor list</Text>;
  }

  if (!data || data.cast.length === 0) {
    return <Text>No cast found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.actorTitle}>Actors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.cast.map((actor) => (
          <View key={actor.id} style={styles.actorView}>
            <View style={styles.actorBg}>
              <Image
                style={styles.actorImage}
                source={{ uri: actor.profile_path ? `${IMG_PATH}/${actor.profile_path}` : undefined }}
              />
            </View>
            <Text style={styles.actorName}>{actor.name}</Text>
            <Text style={styles.actionCharacter}>{actor.character}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  actorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actorView: {
    maxWidth: 150,
    marginRight: 10,
    alignItems: 'center',
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actorBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:'#dedcdc'
  },
  actorName: {
    marginTop: 5,
    textAlign:'center',
    fontWeight:'500'
},
    actionCharacter: {
        textAlign:'center'
    }
});

export default MovieCastList;
