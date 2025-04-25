import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HeaderBar = ({
  title,
  onSearch,
  showCamera,
  menuItems,
  onToggleDropdown,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      {/* Titre ou champ de recherche */}
      {isSearching ? (
        <TextInput
          style={styles.searchInput}
          placeholder={`Search in ${title.toLowerCase()}...`}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            onSearch?.(text);
          }}
          autoFocus
          onBlur={() => setIsSearching(false)}
        />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      {/* Icônes à droite */}
      <View style={styles.icons}>
        {onSearch && (
          <TouchableOpacity onPress={() => setIsSearching(!isSearching)}>
            <MaterialIcons name="search" size={24} color="black" />
          </TouchableOpacity>
        )}

        {showCamera && (
          <TouchableOpacity>
            <MaterialIcons name="camera-alt" size={24} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onToggleDropdown}>
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    // backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#A020F0",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  icons: {
    flexDirection: "row",
    color: "white",
    gap: 15,
  },
});

export default HeaderBar;
