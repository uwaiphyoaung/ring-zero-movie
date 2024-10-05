import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Title } from 'react-native-paper';

interface MessageViewProps {
  icon?: string;
  title: string;
  message: string;
}

const MessageView: React.FC<MessageViewProps> = ({ icon, title, message }) => {
  return (
    <View style={styles.messageContainer}>
      {icon && <MaterialIcons name={icon} size={50} />}
      <Title style={styles.messageHeader}>{title}</Title>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageHeader: { 
    fontSize: 22,
    fontWeight: '400', 
    marginBottom: 10 
  },
  messageText: {
    fontSize: 16,
    color: "gray",
  },
});

export default MessageView;
