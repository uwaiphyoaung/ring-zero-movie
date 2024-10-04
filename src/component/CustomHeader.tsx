import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

interface AppHeaderProps {
    title: string;
    navigation: any;
}

const CustomAppHeader: React.FC<AppHeaderProps> = ({ title, navigation }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconButton icon="arrow-left" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginLeft: 8 }}>{title}</Text>
        </View>
    );
};

export default CustomAppHeader;