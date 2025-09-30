import { create } from "zustand";

interface DashboardState {
  allChartTypes: { "1x1": string[]; "1x2": string[] };
  spaces: {
    "1x1": string[];
    "1x2": string[];
  };
  setChoosedType: (space: "1x1" | "1x2", idx: number, choosed: string) => void;
  setRevertSpace: (spaces: { "1x1": string[]; "1x2": string[] }) => void;
}
const useStore = create<DashboardState>((set) => ({
  allChartTypes: {
    "1x1": ["pie", "bar", "line", "CircleProgress"],
    "1x2": ["pie"],
  },
  spaces: {
    "1x1": ["pie", "bar", "line", "CircleProgress"],
    "1x2": ["pie"],
  },
  // 動作 (actions)
  // 抽換
  setChoosedType: (space, idx, choosed) =>
    set((state) => {
      const updatedArray = [...state.spaces[space]];
      updatedArray[idx] = choosed;

      return {
        spaces: {
          ...state.spaces,
          [space]: updatedArray,
        },
      };
    }),
  // 取消 回復原狀態
  setRevertSpace: (prev) =>
    set({
      spaces: prev,
    }),
}));

export default useStore;
