import { create } from "zustand";

interface I_ShowState {
  lightBoxShow: boolean;
  setLightBoxShow: (newState: boolean) => void;
  triggerName: string;
  setTriggerName: (chartName?: string) => void;
  whichBtnClick: string;
  setWhichBtnClick: (btnName?: string) => void;
  chartHint: { [key: string]: string };
}
const useStore = create<I_ShowState>((set) => ({
  lightBoxShow: false,
  setLightBoxShow: (newState) => set({ lightBoxShow: newState }),
  triggerName: "",
  setTriggerName: (chartName) => set({ triggerName: chartName }),
  whichBtnClick: "",
  setWhichBtnClick: (btnName) => set({ whichBtnClick: btnName }),
  chartHint: {
    pie: "資料說明：<br>圓餅圖<br>1.資料更新頻率：每分鐘更新<br>2.資料來源：00_1min_motc_incident_data.xml<br>3.說明:當日事故統計與歷史進行比對<br>壅塞<br>1.資料更新頻率：每小時更新<br>2.資料來源：TDCS<br>3.壅塞定義，路段速率低於40<br>3.說明:當日壅塞(紅格子)統計與歷史進行比對<br>",
    bar: "資料說明：<br>直條圖<br>1.資料更新頻率：每分鐘更新<br>2.資料來源：",
    line: "資料說明：<br>折線圖<br>1.資料更新頻率：每分鐘更新<br>2.資料來源：",
    CircleProgress:
      "資料說明：<br>達成率圖<br>1.資料更新頻率：每分鐘更新<br>2.資料來源：",
  },
}));

export default useStore;
