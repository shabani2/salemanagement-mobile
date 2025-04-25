// app/RootLayoutNav.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/components/useColorScheme";
import React from "react";
import { StyleSheet, View } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // <PaperProvider theme={MD3DarkTheme}>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: "#fff",
          headerTitleStyle: styles.headerTitle,
          headerShadowVisible: false,
          //cardStyle: { backgroundColor: '#F0F2F5' },
          headerShown: false,
        }}
      >
        <Stack.Screen name="/login" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Accueil", headerShown: false }}
        />
        <Stack.Screen name="/produits" options={{ title: "Produits" }} />
        <Stack.Screen
          name="/profil"
          options={{ title: "Profil", headerShown: false }}
        />
        <Stack.Screen name="/journal" options={{ title: "Journal" }} />
        <Stack.Screen
          name="/rapport"
          options={{ title: "Rapport", headerShown: false }}
        />
        <Stack.Screen name="/categorie/[id]" options={{ title: "Catégorie" }} />
      </Stack>
    </ThemeProvider>
    // </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: "#A020F0", elevation: 0, shadowOpacity: 0 },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
});
