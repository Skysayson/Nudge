import { Dispatch, SetStateAction, createContext } from "react";
import { TaskContent } from "./interfaces";

export interface ThemeContextType {
  renderFullTask: boolean;
  setRenderFullTask: Dispatch<SetStateAction<boolean>>;
  selectedTask: TaskContent | null;
  setSelectedTask: (task: TaskContent | null) => void;
  numericalState: number;
  setNumericalState: Dispatch<SetStateAction<number>>;
  userId: number | null; // Global state for user_id
  setUserId: Dispatch<SetStateAction<number | null>>; // Setter for user_id
  emptyTask: boolean;
  setEmptyTask: Dispatch<SetStateAction<boolean>>;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | null>(null);
