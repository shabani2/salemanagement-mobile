import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCategorieStore from "@/stores/Produits/categoryStore";

const { width } = Dimensions.get("window"); // Récupère la largeur de l'écran
const ITEM_WIDTH = width / 3 - 15; // Pour afficher 3 éléments visibles avec une marge

const CategoryList: React.FC = () => {
  const { categories, fetchCategories } = useCategorieStore();
  const router = useRouter();

  useEffect(() => {
    const getTokenAndFetch = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        fetchCategories(token);
      }
    };
    getTokenAndFetch();
  }, []);

  const renderItem = ({
    item,
  }: {
    item: { _id?: string; nom: string; image?: string };
  }) => (
    <TouchableOpacity
      key={item._id || Math.random().toString()}
      style={styles.categoryItem}
      onPress={() => item._id && router.push(`/categorie/${item._id}`)}
    >
      <Image
        source={{
          uri: item.image
            ? `http://192.168.29.2:8000/${item.image}`
            : "https://via.placeholder.com/64",
        }}
        style={styles.image}
      />

      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {item.nom}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item._id ? item._id : `category-${index}`
        }
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  categoryItem: {
    width: ITEM_WIDTH,
    height: 64, // Hauteur demandée
    backgroundColor: "#545454",
    borderRadius: 10,
    padding: 3,
    marginHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3, // Ombre pour Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 21,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    // textAlign: 'center',
    color: "#fff",
    width: "90%",
    marginLeft: 10, // Correction : Supprimer les guillemets pour en faire un nombre
  },
});

export default CategoryList;
