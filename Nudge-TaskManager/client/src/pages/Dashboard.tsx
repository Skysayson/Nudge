import { Input, Button, Avatar, ActionIcon } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconSearch,
  IconLogout,
  IconBell,
} from "@tabler/icons-react";
import DashboardPage from "./DashboardContent";
import { useState } from "react";
import NudgeLogo from "../assets/Group 1.svg";
import { StatTask, TaskContent } from "../interfaces/interfaces";
import { ThemeContext } from "../interfaces/ThemeContext";
import FullCard from "../components/FullCard";

export const DashBoard:React.FC= () => {
  const teams = ["Team 1", "Team 2", "Team 3"];
  const [selectDash, setSelectDash] = useState(false); //Render content of Dashboard
  const [renderFullTask, setRenderFullTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);

  // const [changeTeam, setChangeTeam] = useState(false); 

  // Toggle dashboard visibility
  const toggleDashboard = () => {
    if(selectDash === false) {
      setSelectDash(true);
    }
    setRenderFullTask(false)
  };

  // Toggle team change (not currently using the value, just the function)
  // const TeamChange = () => {
  //   setChangeTeam(!changeTeam);
  // };

  const incompleteTasks: TaskContent[] = [
    {
      status: "Incomplete",
      priority: "Low",
      title: "Kent Task",
      content: "Bomboclaat a;,sd;asd;a;da;ds;a,sd;a,ds;as,dla,sdl,asld,aldas,dla,sdla,sdla as,dla,sdla,dslaslmdlamasldlasdmlasmdlmasdmasdlmadslmalsmalsdmaldsmdddddddddddddddddddddddasdlamsdlmalsamsld",
      assigned: ["Bryan","Vi", "Sky"],
      comments: 3,
      due: new Date('2024-5-11'), // Example due date
    },
    {
        status: "Incomplete",
        priority: "High",
        title: "UI/UX Design",
        content: "Wireframe needed in Figma akndddddddddddddddddddddddddddddddddddddddddddddddddddsssssssssssssssddddddddddddddddddddddddddddddddddddasd;as,d;a,sd;,a;d;a,sd;a,;ds,a;sd,;a,s;d,sdkandsknasdknaskdnansdkansdknaskdnakdsnklasndla,s;d,a;,sd;asd;a;da;ds;a,sd;a,ds;as,dla,sdl,asld,aldas,dla,sdla,sdla as,dla,sdla,dslaslmdlamasldlasdmlasmdlmasdmasdlmadslmalsmalsdmaldsmdddddddddddddddddddddddasdlamsdlmalsamsld",
        assigned: ["Michael", "George", "Sky"],
        comments: 5,
        due: new Date('2024-11-15'), // Example due date
    },
    {
        status: "Incomplete",
        priority: "Medium",
        title: "Content Creation",
        content: "Draft new articles for the blog",
        assigned: ["Ava", "Mia"],
        comments: 2,
        due: new Date('2024-11-20'), // Example due date
    },
    {
        status: "Incomplete",
        priority: "Low",
        title: "Meeting Preparation",
        content: "Organize agenda for client meeting",
        assigned: ["Henry"],
        comments: 0,
        due: new Date('2024-11-25'), // Example due date
    },
];

const inProgressTasks: TaskContent[] = [
    {
        status: "In Progress",
        priority: "High",
        title: "Security Audit",
        content: "Conduct vulnerability assessments",
        assigned: ["James", "Lucas"],
        comments: 4,
        due: new Date('2024-11-18'), // Example due date
    },
    {
        status: "In Progress",
        priority: "Medium",
        title: "API Integration",
        content: "Connect the frontend with backend services",
        assigned: ["Sophia", "Oliver"],
        comments: 3,
        due: new Date('2024-11-22'), // Example due date
    },
    {
        status: "In Progress",
        priority: "Low",
        title: "Marketing Plan",
        content: "Develop a Q4 marketing strategy",
        assigned: ["William", "Ella"],
        comments: 1,
        due: new Date('2024-11-30'), // Example due date
    },
];

const completeTasks: TaskContent[] = [
    {
        status: "Complete",
        priority: "High",
        title: "Bug Fixes",
        content: "Resolve critical issues in production",
        assigned: [],
        comments: 6,
        due: new Date('2024-10-30'), // Example due date
    },
    {
        status: "Complete",
        priority: "Medium",
        title: "Testing",
        content: "Create test cases for new features",
        assigned: ["Isabella", "Jack"],
        comments: 3,
        due: new Date('2024-10-25'), // Example due date
    },
    {
        status: "Complete",
        priority: "Low",
        title: "Database Optimization",
        content: "Analyze and improve query performance",
        assigned: ["Emma"],
        comments: 1,
        due: new Date('2024-10-20'), // Example due date
    },
];

const status: StatTask[] = [
  { status: "Incomplete", Task: incompleteTasks},
  { status: "In Progress", Task: inProgressTasks},
  { status: "Complete", Task: completeTasks},
];

  return (
    <ThemeContext.Provider value={{ renderFullTask, setRenderFullTask, selectedTask, setSelectedTask }}>
      <div className="flex w-screen h-screen border-blue-600 overflow-y-hidden overflow-x-hidden">
        <div className="flex flex-col w-[304px] h-full shadow-custom-shadow border-r p-[32px] border-r-[#4B5D6A] bg-[#1A2329]">
          {/* Sidebar Content */}
          <div className="flex border-blue-600 h-max w-max">
            <img src={NudgeLogo} alt="" width={152} />
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
                  onClick={toggleDashboard}
                >
                  Dashboard
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
          <div className="flex items-center pl-[24px] pr-[24px] justify-between shadow-custom-shadow w-full border-b border-[#4B5D6A] min-h-[60px] bg-[#1A2329]">
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
          {selectDash && !renderFullTask && <DashboardPage StatTask={status} />}
        {renderFullTask && selectedTask && <FullCard TaskContent={selectedTask} />}
        </div>
      </div>
  </ThemeContext.Provider>
  );
};

export default DashBoard;
