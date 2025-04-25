// eslint-disable-next-line react-hooks/exhaustive-deps
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import axios from "axios";

interface Categorie {
  _id: string;
  nom: string;
  image?: string;
}

interface CategorieState {
  categories: Categorie[];
  loading: boolean;
  error: string | null;
  fetchCategories: (token: string) => Promise<void>;
  addCategorie: (token: string, categorie: FormData) => Promise<void>;
  deleteCategorie: (token: string, id: string) => Promise<void>;
}

const useCategorieStore = create<CategorieState>(
  persist(
    (set, get) => ({
      categories: [],
      loading: false,
      error: null,

      fetchCategories: async (token) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get<Categorie[]>(
            "http://192.168.29.2:8000/categories",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          set({ categories: response.data, loading: false });
        } catch (error) {
          set({
            error: "Erreur lors de la récupération des catégories",
            loading: false,
          });
        }
      },

      addCategorie: async (token, categorie) => {
        try {
          const response = await axios.post<Categorie>(
            "http://192.168.29.2:8000/categories",
            categorie,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            },
          );
          set({ categories: [...get().categories, response.data] });
        } catch (error) {
          set({ error: "Erreur lors de l’ajout de la catégorie" });
        }
      },

      deleteCategorie: async (token, id) => {
        try {
          await axios.delete(`http://192.168.29.2:8000/categories/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ categories: get().categories.filter((cat) => cat._id !== id) });
        } catch (error) {
          set({ error: "Erreur lors de la suppression de la catégorie" });
        }
      },
    }),
    {
      name: "categories-storage",
      getStorage: () => AsyncStorage,
    },
  ),
);

export default useCategorieStore;
