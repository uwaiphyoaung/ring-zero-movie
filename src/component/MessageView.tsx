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
      {icon && <MaterialIcons name={icon} size={60} />}
      <Title style={{ fontSize: 22, fontWeight: '400', marginBottom: 20 }}>{title}</Title>
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
  messageText: {
    fontSize: 18,
    color: "gray",
  },
});

export default MessageView;
