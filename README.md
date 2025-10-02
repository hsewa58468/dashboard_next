# dashboard 專案說明文件

這是一個基於 React 搭配 Next.js App Router 框架的專案。

## 專案結構說明

### 核心檔案與配置

以下是專案中一些核心檔案及其配置的簡要說明。

| 檔案名稱         | 說明                                                                      |
| :--------------- | :------------------------------------------------------------------------ |
| `package.json`   | 記錄專案所需的所有套件 (Dependencies) 與常用的指令 (`scripts`)。          |
| `next.config.js` | Next.js 的主要設定檔，用於配置路由、編譯、環境變數、圖片優化等功能。      |
| `tsconfig.json`  | TypeScript 的設定檔，定義了編譯器選項與專案的根目錄。                     |
| `.gitignore`     | 定義版本控制時需要忽略的檔案與資料夾，確保不會提交不必要的檔案。          |
| `.env.local`     | 存放開發環境的本地環境變數，通常用於敏感資訊，且不會被提交到 Git 儲存庫。 |

---

### 主要資料夾與功能對應表

| Next.js 資料夾        | 功能說明                                                                                                                                            |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`src/app/`**        | **主頁面和路由定義。** Next.js 根據此資料夾結構自動生成路由。 global.css 作為全域共用樣式(包含 tailwind 客製設定)。                                 |
| **`src/components/`** | **可重複使用的 UI 元件。** 所有通用或獨立的 React 元件都存放於此。/tools 資料夾用於存放各種小型、複用性高的 UI 元件，可被導入到不同的頁面或元件中。 |
| **`src/store/`**      | **狀態管理工具相關檔案。** 使用 Zustand 套件管理跨元件的狀態儲存。                                                                                  |
| **`src/templates/`**  | **網站的頁面佈局元件。** 用於定義固定的結構，例如包含 Header, Footer 的頁面框架。                                                                   |
| **`src/types/`**      | **TypeScript 類型定義檔案。** 可將元件之間共用性高的的介面、類型等放於此。                                                                          |
| **`public/`**         | **靜態檔案。** 不經過打包處理，可直接透過根路徑訪問，如網站 logo、`favicon.ico` 等。                                                                |

---

### 重要檔案功能

| 資料夾           | 檔案名稱    | 功能說明                                                                                  |
| :--------------- | :---------- | :---------------------------------------------------------------------------------------- |
| **`src/app/`**   | page.tsx    | **首頁** /index                                                                           |
| **`src/app/`**   | layout.tsx  | **全分頁共用 UI** 在此新增的畫面會套用所有分頁，header、navbar 等渲染節點可放置於此。     |
| **`src/app/`**   | global.css  | **全域樣式** 可設定全域共通樣式，因使用 tailwind@4 因此也可直接在此調整 tailwind 相關設定 |
| **`src/types/`** | global.d.ts | **外部套件定義** 部分沒有@types 的外部套件可在此 declare                                  |

---

### 開新分頁

本專案使用 Next.js App Router ， 在 /src/app 內新增分頁資料夾(ex:/dashboard)，並在裡面創建新的 page.tsx 即可新增分頁

---

## 專案開發規範

本文件旨在提供專案開發的基礎指南，涵蓋 TypeScript 支援與常用的開發指令。

---

### TypeScript 支援與類型定義

本專案使用 **TypeScript** 進行開發，以提升程式碼的健壯性與可維護性。

---

### 常用指令

以下是專案開發過程中常用的指令及其說明。

#### `package.json` Scripts 指令說明

以下表格詳細說明了 `package.json` 中定義的開發指令。

| 指令            | 說明                                                                                                                   |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`   | **啟動開發伺服器**。此指令會啟用 Next.js 的開發模式，通常會監聽檔案變動並自動重啟伺服器。                              |
| `npm run build` | **建立生產環境的應用程式**。此指令會將你的程式碼打包、優化並編譯為可部署的靜態資源或伺服器程式碼。                     |
| `npm run start` | **啟動生產伺服器**。當應用程式完成建置後，使用此指令來運行生產環境的 Next.js 伺服器，通常搭配 `npm run build` 後使用。 |
| `npm run lint`  | **執行程式碼檢查**。此指令會運行 ESLint，根據專案的規則檢查程式碼中的潛在錯誤或風格問題，確保程式碼品質的一致性。      |

---

# React 函式元件 (Function Component) 結構與規範

為了維持專案程式碼的一致性與可讀性，請遵循以下關於函式元件的組織與撰寫規範。

### 1. 檔案內容順序

請依照以下順序組織單一 React 元件檔案的內容：

```typescript
// 1. 引入外部庫 (import)
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@mui/material";

// 2. 引入內部元件或類型定義
import SomeOtherComponent from "@/components/SomeOtherComponent";

// 3. 元件所需的外部工具函數或 Hook
import { someUtilityFunction } from "@/utils/someUtility";
import useMyStore from "@/store/useMyStore";

// 4. TypeScript 類型定義 (如果沒有在 types/ 單獨定義)
interface MyComponentProps {
  /** 顯示在按鈕上的文字 */
  label: string;
  /** 回調函數 */
  onClick: () => void;
  /** 加入 ? 作為非必填參數 */
  disabled?: boolean;
}

function MyComponent({ label, onClick, disabled = false }: MyComponentProps) {
  // 1. 狀態與參考 (useState, useRef)
  const [count, setCount] = useState(0);
  const myRef = useRef<HTMLDivElement>(null);

  // 2. 外部 Hook 呼叫 (useContext, useStore)
  const { theme } = useMyStore();

  // 3. 副作用 (useEffect)
  useEffect(() => {
    console.log("元件已掛載");
    return () => {
      console.log("元件已卸載");
    };
  }, []);

  // 4. 事件處理方法 (handler functions)
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
    onClick();
  };

  // 5. 渲染回傳 (return JSX)
  return (
    <div ref={myRef} style={buttonStyle}>
      <Button onClick={handleClick} disabled={disabled}>
        {label} - {count}
      </Button>
    </div>
  );
}

// 預設匯出
export default MyComponent;
```
