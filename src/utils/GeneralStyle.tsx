import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container:{
      flex:1,
      padding: 20
    },
    loadingBackground: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15
      },
      paragraph: {
        fontSize: 14,
        color: '#666',
        lineHeight: 24,
        marginBottom: 15
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
      },
      outlineTextField:{
        marginBottom:15
      },
      btnContained:{
          borderRadius:20,
      }
});