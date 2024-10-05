import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Movie } from "../redux/model/MovieModel";

export type RootStackParamList = {
    AppDrawer: undefined;
    MovieTabNavigation: undefined; 
    MovieDetail: { movie: Movie };
    Search: undefined;
    LoginScreen: undefined;
    SplashScreen: undefined;
    ImageViewScreen: { imageUrl: string };
    TrailerViewScreen: { videoUrl: string };
    ProfileScreen: undefined;
};

export type MovieTabParamList = {
    UpcomingScreen: undefined;
    PopularScreen: undefined;
};

export type UpcomingScreenNavigationProp = StackNavigationProp<RootStackParamList, "MovieDetail">;
export type PopularScreenNavigationProp = StackNavigationProp<RootStackParamList, "MovieDetail">;

export type MovieDetalRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

export type SearchRouteProp = {
  navigation: StackNavigationProp<RootStackParamList, "Search">;
  route: RouteProp<RootStackParamList, "Search">;
};

export type AppHeaderProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    StackNavigationProp<SearchRouteProp>
  >;
};

export type MovieDetailNavigationProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "MovieDetail">,
    CompositeNavigationProp<
      StackNavigationProp<RootStackParamList, "ImageViewScreen">,
      StackNavigationProp<RootStackParamList, "TrailerViewScreen">
    >
  >;
};

export type ImageViewRouteProps = {
  navigation: StackNavigationProp<RootStackParamList, "ImageViewScreen">;
  route: RouteProp<RootStackParamList, "ImageViewScreen">;
};

export type TrailerViewRouteProps = {
  navigation: StackNavigationProp<RootStackParamList, "TrailerViewScreen">;
  route: RouteProp<RootStackParamList, "TrailerViewScreen">;
};