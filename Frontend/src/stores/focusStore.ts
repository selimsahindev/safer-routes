import { create } from 'zustand';

const useFocusStore = create((set) => ({
  isFocused: false,
  setFocus: (value: boolean) => set({ isFocused: value }),
}));

export default useFocusStore;