// ThemeContext.ts
import { Dispatch, SetStateAction,createContext } from "react";
import { TaskContent } from "./interfaces";

// Define the ThemeContext for `renderFullTask` and `selectDash`
export interface ThemeContextType {
  renderFullTask: boolean;
  setRenderFullTask: Dispatch<SetStateAction<boolean>>;
  selectedTask: TaskContent | null;
  setSelectedTask: (task: TaskContent | null) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
//fuck fuck render task and get task content to render

//I want to pass the state of the fullCard to conditionally render it with the DashboardContent 
