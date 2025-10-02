import { create } from "zustand";

interface I_ShowState {
  lightBoxShow: boolean;
  setLightBoxShow: (newState: boolean) => void;
}
const useStore = create<I_ShowState>((set) => ({
  lightBoxShow: false,
  setLightBoxShow: (newState) => set({ lightBoxShow: newState }),
}));

export default useStore;
