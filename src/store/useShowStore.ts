import { create } from "zustand";

// 定義 Store 的型別 (TypeScript)
export interface Template {
  type: string;
  editing: boolean;
}

// 定義整個 Store 的狀態
interface DashboardState {
  allChartTypes: { "1x1": string[]; "1x2": string[] };
  spaces: {
    "1x1": Template[];
    "1x2": Template[];
  };
  editingSpace: { name: "1x1" | "1x2" | ""; idx: number };
  setChoosedType: (space: "1x1" | "1x2", idx: number, choosed: string) => void;
  setEditingSpace: (name: "1x1" | "1x2" | "", idx: number) => void;
}
// 使用 create 函數建立一個 Store
const useStore = create<DashboardState>((set) => ({
  // 初始狀態
  allChartTypes: {
    "1x1": ["pie", "bar", "line", "CircleProgress"],
    "1x2": ["pie"],
  },
  spaces: {
    "1x1": [
      { type: "pie", editing: false },
      { type: "bar", editing: false },
      { type: "line", editing: false },
      { type: "CircleProgress", editing: false },
    ],
    "1x2": [
      { type: "pie", editing: false },
      { type: "bar", editing: false },
      { type: "line", editing: false },
    ],
  },
  editingSpace: { name: "", idx: 0 },
  // 動作 (actions)
  setChoosedType: (space, idx, choosed) =>
    set((state) => {
      // 複製當前的 templates 陣列
      const currentTemplates = [...state.spaces[space]];
      // 在指定索引處替換為新的值
      currentTemplates[idx].type = choosed;

      // 返回一個新的 spaces 物件，並將更新後的陣列賦值給對應的 space
      return {
        spaces: {
          ...state.spaces,
          [space]: currentTemplates,
        },
      };
    }),
  setEditingSpace: (name, idx) =>
    set({
      editingSpace: { name, idx },
    }),
}));

export default useStore;
