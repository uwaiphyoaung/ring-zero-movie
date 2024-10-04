import { StyleSheet, View , Text} from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";
import { globalStyles } from "../utils/GeneralStyle";
import React from "react";

interface ErrorViewProps{
    visible: boolean;
    title: string;
    retry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({visible,title,retry}) => {
    if(visible){
        return <View style = {styles.container}>
        <Text style={globalStyles.title}>
            {title}
        </Text>
        <Paragraph style={globalStyles.paragraph}>
        Oops! we can't find the movies you'e looking for.
        </Paragraph>
        <Button
        mode="contained"
        style={globalStyles.btnContained}
        labelStyle={globalStyles.buttonText}
        onPress={retry}
        >
            Try Again
        </Button>
    </View>;
    }

    return (
        <View/>    
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default ErrorView;