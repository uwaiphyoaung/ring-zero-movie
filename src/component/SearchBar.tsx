import React from 'react';
import { Appbar, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import AppColors from '../utils/ColorUtils';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  onClear: () => void;
  onBack: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch, onClear, onBack }) => {
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
        returnKeyType="search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
        right={searchQuery.length>0?<TextInput.Icon icon="close" onPress={onClear} />:<View/>}
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