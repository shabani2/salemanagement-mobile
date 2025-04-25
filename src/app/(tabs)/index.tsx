import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryList from "@/components/Produits/CategoriesList";
import categoryStore from "@/stores/Produits/categoryStore";
import { useRouter } from "expo-router";

const index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <CategoryList />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
