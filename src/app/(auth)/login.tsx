// app/(auth)/Login.tsx
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "@/stores/authStore";

const Login = () => {
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!telephone.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      await login(telephone, password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Erreur", "Numéro de téléphone ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Connexion..." : "Se connecter"}
        </Text>
        {loading && (
          <ActivityIndicator size="small" color="#fff" style={styles.loader} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1877F2",
    padding: 15,
    borderRadius: 8,
    width: "100%",
  },
  buttonDisabled: { backgroundColor: "#A0C4F2" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loader: { marginLeft: 10 },
});

export default Login;
