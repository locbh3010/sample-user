import create from "zustand";

export const cartStore = create((set, get) => ({
  isOpen: false,
  handleOpenCart: (value = 0) => {
    if (value === 0) {
      const oldValue = get().isOpen;
      set({ isOpen: !oldValue });
    } else if (value === true || value === false) {
      set({ isOpen: value });
    }

    if (get().isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  },
}));
