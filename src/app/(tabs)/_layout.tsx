import React, { useState, useRef } from "react";
import * as Font from "expo-font";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  PanResponder,
} from "react-native";
import { Tabs, usePathname, useRouter } from "expo-router";
import HeaderBar from "./../../components/HeaderBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useAuthStore from "@/stores/authStore";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const pathname = usePathname();
  const router = useRouter(); // Permet de naviguer entre les onglets
  const tabs = ["/", "/Status", "/Calls", "/Settings"]; // Liste des chemins des onglets
  const currentIndex = tabs.indexOf(pathname); // Obtenir l'index de l'onglet actif

  // Configuration dynamique pour le HeaderBar

  const getHeaderProps = () => {
    switch (pathname) {
      case "/stock":
        return {
          title: "Stock",
          onSearch: null,
          showCamera: false,
          menuItems: [
            { label: "Profil", action: () => router.push("/profil") },
            { label: "Rapport", action: () => router.push("/rapport") },
            {
              label: "Deconnecter",
              action: async () => {
                await useAuthStore.getState().logout(); // ✅ Appelle la fonction logout
                router.replace("/login"); // ✅ Redirige vers la page de connexion
              },
            },
          ],
        };
      case "/vente":
        return {
          title: "Vente",
          onSearch: false,
          showCamera: false,
          menuItems: [
            { label: "Profil", action: () => router.push("profil/") },
            { label: "Rapport", action: () => router.push("rapport/") },
            {
              label: "Deconnecter",
              action: async () => {
                await useAuthStore.getState().logout(); // ✅ Appelle la fonction logout
                router.replace("login"); // ✅ Redirige vers la page de connexion
              },
            },
          ],
        };
      case "/":
        return {
          title: "Acceuil",
          onSearch: null, //(query: React.SetStateAction<string>) => setSearchQuery(query),
          showCamera: false,
          menuItems: [
            { label: "Profil", action: () => router.push("/profil") },
            { label: "Rapport", action: () => router.push("/rapport") },
            {
              label: "Deconnecter",
              action: async () => {
                await useAuthStore.getState().logout(); // ✅ Appelle la fonction logout
                router.replace("/login"); // ✅ Redirige vers la page de connexion
              },
            },
          ],
        };

      default:
        return null;
    }
  };

  const headerProps = getHeaderProps();

  // Gestion du clic pour ouvrir/fermer le dropdown
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
    if (!dropdownVisible && headerProps) {
      setDropdownItems(headerProps.menuItems || []);
    }
  };

  // Cacher le dropdown quand on clique en dehors
  const hideDropdown = () => {
    setDropdownVisible(false);
    Keyboard.dismiss(); // Optionnel : cache aussi le clavier si visible
  };

  // PanResponder pour détecter le swipe horizontal
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy), // Détecte les mouvements horizontaux
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50 && currentIndex > 0) {
          // Swipe vers la droite (onglet précédent)
          router.push(tabs[currentIndex - 1]);
        } else if (gestureState.dx < -50 && currentIndex < tabs.length - 1) {
          // Swipe vers la gauche (onglet suivant)
          router.push(tabs[currentIndex + 1]);
        }
      },
    }),
  ).current;

  return (
    <TouchableWithoutFeedback onPress={hideDropdown}>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {/* HeaderBar */}
        {headerProps && (
          <HeaderBar
            title={headerProps.title}
            onSearch={headerProps.onSearch}
            showCamera={headerProps.showCamera}
            menuItems={headerProps.menuItems}
            onToggleDropdown={handleDropdownToggle}
          />
        )}

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <FlatList
              data={dropdownItems}
              keyExtractor={(item, index) => `${item.label}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    item.action();
                    setDropdownVisible(false); // Ferme le dropdown après sélection
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Tabs */}
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: "Accueil", // Renomme l'onglet "index" en "Accueil"
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="vente"
            options={{
              //title: "vente",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="store" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="stock"
            options={{
              // title: "stock",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="inventory" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
        </Tabs>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    zIndex: 1000,
    elevation: 5,
    width: 150,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  header: { backgroundColor: "#A020F0", elevation: 0, shadowOpacity: 0 },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
});
