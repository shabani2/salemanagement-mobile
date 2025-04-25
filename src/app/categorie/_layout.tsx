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

import { useColorScheme } from "@/components/useColorScheme";
import React from "react";
import { StyleSheet, View } from "react-native";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

function RapportLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: "#fff",
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        //cardStyle: { backgroundColor: '#F0F2F5' },
        // headerShown:false,
      }}
    >
      <Stack.Screen
        name="/"
        options={{
          headerShown: false,
          headerBackground: () => (
            <View style={{ backgroundColor: "purple", flex: 1 }} />
          ),
        }}
      />
      <Stack.Screen
        name="/[id]"
        options={{
          title: "categorie",
          headerShown: true,
          headerBackground: () => (
            <View style={{ backgroundColor: "purple", flex: 1 }} />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: "#A020F0", elevation: 0, shadowOpacity: 0 },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
});

export default RapportLayout;
