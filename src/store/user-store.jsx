import { addDoc, collection, getDocs } from "firebase/firestore";
import create from "zustand";
import { db } from "../configs/firebase-configs";

export const userStore = create((set, get) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  setUser: (currentUser) => {
    set({ user: currentUser });
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  },
  signOut: () => {
    sessionStorage.removeItem("user");
    set({ user: null });
    location.reload;
  },
}));
