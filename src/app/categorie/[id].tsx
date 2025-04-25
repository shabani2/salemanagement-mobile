import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function CategorieDetail() {
  const { id } = useLocalSearchParams(); // Récupère l'ID de l'URL

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catégorie ID: {id}</Text>
      {/* Ajoute ici la logique pour récupérer et afficher les détails de la catégorie */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
