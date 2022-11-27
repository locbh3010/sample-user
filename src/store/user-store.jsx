import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import create from "zustand";
import { db } from "../configs/firebase-configs";

export const userStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  signOut: () => {
    sessionStorage.removeItem("user");
    set({ user: null });
    location.reload;
  },
  signIn: (email, password, callback = () => {}) => {
    const docRef = query(collection(db, "users"), where("email", "==", email));

    onSnapshot(docRef, (res) => {
      res.docs.length > 0 &&
        res.docs.map((doc) => {
          const data = doc.data();
          if (data.password === password) {
            const currentUser = {
              id: doc.id,
              ...data,
            };
            sessionStorage.setItem("user", JSON.stringify(currentUser));
            set({ user: currentUser });
          }
        });
    });
  },
  signUp: async (currentUser, callback = () => {}) => {
    const userRef = await collection(db, "users");
    let count = 0;
    await getDocs(userRef).then(async (res) => {
      const users = res.docs;

      (await users.length) > 0 &&
        users.map((user) => {
          const data = user.data();

          data.email === currentUser.email && count++;
        });
    });

    if (count === 0) {
      if (currentUser.fullname && currentUser.email && currentUser.password) {
        addDoc(collection(db, "users"), currentUser).then((res) => {
          const user = {
            email: currentUser.email,
            password: currentUser.password,
            fullname: currentUser.fullname,
            id: res.id,
          };
          sessionStorage.setItem("user", JSON.stringify(user));
          set({ user: user });
          callback();
        });
      }
    }
  },
}));
