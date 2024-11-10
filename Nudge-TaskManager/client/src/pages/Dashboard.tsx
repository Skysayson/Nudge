import { Input, Button, Avatar, ActionIcon } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconSearch,
  IconLogout,
  IconBell,
} from "@tabler/icons-react";
import DashboardPage from "./DashboardContent";
import { useState, createContext, Dispatch, SetStateAction } from "react";

// Define the correct type for the context
type ThemeContextType = {
  selectDash: boolean;
  setSelectDash: Dispatch<SetStateAction<boolean>>; // Correct type for the setter function
};

// Create the context with the default value
const defaultThemeContext: ThemeContextType = {
  selectDash: false,
  setSelectDash: () => {}, // Default function
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const DashBoard = () => {
  const teams = ["Team 1", "Team 2", "Team 3"];
  const [selectDash, setSelectDash] = useState(false);
  const [changeTeam, setChangeTeam] = useState(false);

  // Toggle dashboard visibility
  const DashBoard = () => {
    setSelectDash(!selectDash);
  };

  // Toggle team change (not currently using the value, just the function)
  const TeamChange = () => {
    setChangeTeam(!changeTeam);
  };

  return (
    <ThemeContext.Provider value={{ selectDash, setSelectDash }}>
      <div className="flex w-screen h-screen border-blue-600 overflow-y-hidden overflow-x-hidden">
        <div className="flex flex-col w-[304px] h-full shadow-custom-shadow border-r p-[32px] border-r-[#4B5D6A] bg-[#1A2329]">
          {/* Sidebar Content */}
          <div className="flex border-blue-600 h-max w-max">
            <img src="../assets/Group 1.svg" alt="" width={152} />
          </div>
          <div className="mt-[29px] flex flex-col h-screen justify-between">
            {/* Main Menu */}
            <div className="flex flex-col">
              <Input
                placeholder="Search"
                size="xs"
                leftSection={<IconSearch size={17} />}
                styles={{
                  input: {
                    backgroundColor: "#4B5D6A",
                    color: "white",
                  },
                }}
                className="text-[#667988] mb-[29px]"
              />
              <div className="flex flex-col mb-[29px]">
                <h1 className="text-[#4B5D69] text-[12px]">MAIN MENU</h1>
                <Button
                  variant="subtle"
                  color="#667988"
                  leftSection={<IconLayoutDashboard size="1rem" />}
                  className="flex items-center justify-start font-light"
                  onClick={DashBoard}
                >
                  DashBoard
                </Button>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#4B5D69] text-[12px]">TEAMS</h1>
                {teams.map((team, index) => (
                  <Button
                    key={index}
                    variant="subtle"
                    color="#667988"
                    className="flex items-center justify-start"
                    onClick={TeamChange}
                    leftSection={<IconLayoutDashboard size="1rem" />}
                  >
                    <span className="text-[14px] font-light">{team}</span>
                  </Button>
                ))}
              </div>
            </div>
            {/* Logout Button */}
            <div className="flex h-max items-center justify-center">
              <Button
                leftSection={<IconLogout size="16px" />}
                variant="subtle"
                color="#667988"
                mt="md"
                className="h-[32px] text-[16px] font-light"
                style={{ fontSize: "14px", color: "#667988" }}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#151C21] w-full h-full flex flex-col">
          <div className="flex items-center pl-[33px] pr-[33px] justify-between shadow-custom-shadow w-full border-b border-[#4B5D6A] min-h-[60px] bg-[#1A2329]">
            <div className="text-[#6C899C] text-[32px]">{teams[0]}</div>
            <div className="flex items-center">
              <ActionIcon variant="transparent" color="gray">
                <IconBell />
              </ActionIcon>
              <div className="ml-[28.4px]">
                <Avatar />
              </div>
            </div>
          </div>
          {selectDash && <DashboardPage />}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default DashBoard;
