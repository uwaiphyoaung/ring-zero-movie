import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Movie } from "../redux/model/MovieModel";

export type RootStackParamList = {
    MovieTabNavigation: undefined; 
    MovieDetail: { movie: Movie };
    Search: undefined;
    LoginScreen: undefined;
    SplashScreen: undefined;
  };
  
  export type MovieTabParamList = {
    UpcomingScreen: undefined;
    PopularScreen: undefined;
  };

export type UpcomingScreenNavigationProp = StackNavigationProp<RootStackParamList,"MovieDetail">;

export type PopularScreenNavigationProp = StackNavigationProp<RootStackParamList,'MovieDetail'>;

export type MovieDetalRouteProp = RouteProp<RootStackParamList,'MovieDetail'>;

export type SearchRouteProp = {
  navigation: StackNavigationProp<RootStackParamList,'Search'>;
  route: RouteProp<RootStackParamList,'Search'>;
};

export type AppHeaderProps = {
  navigation: CompositeNavigationProp<
      StackNavigationProp<RootStackParamList>,
      StackNavigationProp<SearchRouteProp>
  >;
};