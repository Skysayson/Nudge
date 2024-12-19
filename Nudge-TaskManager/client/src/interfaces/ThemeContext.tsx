import { Dispatch, SetStateAction, createContext } from "react";
import { TaskContent } from "./interfaces";

// Define the structure of each team member
export interface TeamMember {
  id: number; // Member's ID
  name: string; // Member's name
}

export interface NotifContent {
  notification_id: number | null;
  user_id: number | null;
  task_id: number | null;
  message: string;
  message_type: string;
  sent_at: Date;
}

export interface ThemeContextType {
  commentsLength: number;
  setCommentsLength: Dispatch<SetStateAction<number>>;
  reloadNotif: boolean;
  setReloadNotif: Dispatch<SetStateAction<boolean>>;
  notifPasser: NotifContent;
  setNotifPasser: Dispatch<SetStateAction<NotifContent>>;
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
  teamMembers: TeamMember[]; // Array of objects with id and name
  setTeamMembers: Dispatch<SetStateAction<TeamMember[]>>; // Setter for the array of objects
  reloadTasks: boolean;
  setReloadTasks: Dispatch<SetStateAction<boolean>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | null>(null);
