import { StyleSheet, Text, View } from "react-native";

interface NoInternetWarningProps{
    visible: boolean;
    position?: number;
}

const NoInternetWarning : React.FC<NoInternetWarningProps> = ({visible, position}) => {
    if(!visible){
        return (
            <View style={[{top: position},styles.offlineMessageContainer]}>
              <Text style={styles.offlineMessageText}>You are offline.</Text>
            </View>
        );
    }
    return (
        <View/>
    );
};

const styles = StyleSheet.create({

    offlineMessageContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        zIndex: 10,
      },
      offlineMessageText: {
        color: 'white',
        fontSize: 16,
      }
});


export default NoInternetWarning;