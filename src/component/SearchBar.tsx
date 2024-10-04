import React from 'react';
import { Appbar, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AppColors from '../utils/ColorUtils';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onBack: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch, onBack }) => {
  return (
    <Appbar.Header style={styles.appBar} elevated>
      <Appbar.BackAction onPress={onBack} />
      <TextInput
        mode="outlined"
        outlineColor="transparent"
        activeOutlineColor="transparent"
        style={styles.searchBox}
        contentStyle={styles.searchBoxText}
        placeholder="Search movie ..."
        cursorColor={AppColors.primary}
        multiline={false}
        numberOfLines={1}
        maxLength={50}
        autoFocus={true}
        value={searchQuery}
        onChangeText={onSearch}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#fff",
    height: 57,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "transparent",
  },
  searchBoxText: {
    fontSize: 18,
  },
});

export default SearchBar;
