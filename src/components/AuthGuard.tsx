// app/components/AuthGuard.tsx
// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator, Animated } from "react-native";
import useAuthStore from "@/stores/authStore";
import RootLayoutNav from "../app/RootLayoutNav";

const AuthGuard = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();
  const opacity = new Animated.Value(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setLoading(false);
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      const isAuthRoute = segments[0] === "(auth)";
      if (!isAuthenticated && !isAuthRoute) {
        router.replace("login");
      } else if (isAuthenticated && isAuthRoute) {
        router.replace("(tabs)");
      }
    }
  }, [isAuthenticated, segments, loading]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1877F2" />
      </View>
    );
  }

  return (
    // <Animated.View style={{ flex: 1, opacity }}>
    <RootLayoutNav />
  );
};

export default AuthGuard;
// </Animated.View>
