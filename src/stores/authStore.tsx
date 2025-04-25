// store/authStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import axios from "axios";
import { User } from "@/Models/models";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (telephone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (telephone, password) => {
        try {
          const response = await axios.post<{ token: string; user: User }>(
            "http://192.168.29.2:8000/auth/login",
            { telephone, password },
          );
          const { token, user } = response.data;

          await AsyncStorage.setItem("token", token); // S'assurer que la clé est bien "token" pour la correspondance

          set({ user, token, isAuthenticated: true });
        } catch (error) {
          console.error("Erreur de connexion", error);
          throw error;
        }
      },

      logout: async () => {
        await AsyncStorage.removeItem("authToken");
        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          set({ token, isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => AsyncStorage,
    },
  ),
);

export default useAuthStore;
