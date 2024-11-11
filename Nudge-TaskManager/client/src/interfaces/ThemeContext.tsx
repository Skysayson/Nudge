// ThemeContext.ts
import { createContext, Dispatch, SetStateAction } from "react";

// Define the ThemeContext for `renderFullTask`
export type ThemeContextType = {
  renderFullTask: boolean;
  setRenderFullTask: Dispatch<SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  renderFullTask: false,
  setRenderFullTask: () => {},
});

// Define the DashThemeContext for `selectDash`
export type DashContextType = {
  selectDash: boolean;
  setSelectDash: Dispatch<SetStateAction<boolean>>;
};

export const DashThemeContext = createContext<DashContextType>({
  selectDash: false,
  setSelectDash: () => {},
});
