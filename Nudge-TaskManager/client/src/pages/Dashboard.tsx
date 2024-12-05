import { Input, Button, Avatar, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
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

export const DashBoard: React.FC = () => {
  // Sample teams to display in the sidebar
  const teams = ["Team 1", "Team 2", "Team 3"];

  // State for toggling the rendering of the dashboard
  const [selectDash, setSelectDash] = useState(true);

  // State for toggling the rendering of the full task view
  const [renderFullTask, setRenderFullTask] = useState(false);

  // State for storing the currently selected task
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);

  // Sample task data for different statuses
  const incompleteTasks: TaskContent[] = [
    {
      status: "",
      priority: "",
      title: "",
      content: "",
      assigned: [],
      comments: [
        {
          author: "Sky",
          comment: "Test",
          created: new Date("2025-12-17"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date(), // Added created property
      due: null, // Example due date
    },
    {
      status: "Incomplete",
      priority: "High",
      title: "UI/UX Design",
      content: "Wireframe needed in Figma.",
      assigned: ["Michael", "George", "Sky"],
      comments: [
        { 
          author: "Michael", 
          comment: "Wireframe draft in progress.", 
          created: new Date("2024-11-10"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date("2024-11-1"), // Added created property
      due: new Date("2024-11-15"), // Example due date
    },
    {
      status: "Incomplete",
      priority: "Medium",
      title: "Content Creation",
      content: "Draft new articles for the blog.",
      assigned: ["Ava", "Mia"],
      comments: [
        { 
          author: "Mia", 
          comment: "Initial draft submitted.", 
          created: new Date("2024-11-19"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date("2024-11-10"), // Added created property
      due: new Date("2024-11-20"), // Example due date
    },
    {
      status: "Incomplete",
      priority: "Low",
      title: "Meeting Preparation",
      content: "Organize agenda for client meeting.",
      assigned: ["Henry"],
      comments: [],
      created: new Date("2024-11-15"), // Added created property
      due: new Date("2024-11-25"), // Example due date
    },
  ];
  
  const inProgressTasks: TaskContent[] = [
    {
      status: "In Progress",
      priority: "High",
      title: "Security Audit",
      content: "Conduct vulnerability assessments.",
      assigned: ["James", "Lucas"],
      comments: [
        { 
          author: "Lucas", 
          comment: "Audit phase 1 complete.", 
          created: new Date("2024-11-16"),
          likes: 5,
          dislikes: 0 
        }
      ],
      created: new Date(), // Added created property
      due: null, // Example due date
    },
    {
      status: "In Progress",
      priority: "Medium",
      title: "API Integration",
      content: "Connect the frontend with backend services.",
      assigned: ["Sophia", "Oliver"],
      comments: [
        { 
          author: "Sophia", 
          comment: "Backend endpoint integrated.", 
          created: new Date("2024-11-20"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date("2024-11-15"), // Added created property
      due: new Date("2024-11-22"), // Example due date
    },
    {
      status: "In Progress",
      priority: "Low",
      title: "Marketing Plan",
      content: "Develop a Q4 marketing strategy.",
      assigned: ["William", "Ella"],
      comments: [
        { 
          author: "Ella", 
          comment: "Marketing draft ready for review.", 
          created: new Date("2024-11-28"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date("2024-11-25"), // Added created property
      due: new Date("2024-11-30"), // Example due date
    },
  ];
  
  const completeTasks: TaskContent[] = [
    {
      status: "Complete",
      priority: "High",
      title: "Bug Fixes",
      content: "Resolve critical issues in production.",
      assigned: [],
      comments: [
        { 
          author: "James", 
          comment: "Critical bug fixes deployed.", 
          created: new Date("2024-10-29"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date("2024-10-15"), // Added created property
      due: new Date("2024-10-30"), // Example due date
    },
    {
      status: "Complete",
      priority: "Medium",
      title: "Testing",
      content: "Create test cases for new features.",
      assigned: ["Isabella", "Jack"],
      comments: [
        { 
          author: "Isabella", 
          comment: "All test cases verified.", 
          created: new Date("2024-10-20"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date("2024-10-10"), // Added created property
      due: new Date("2024-10-25"), // Example due date
    },
    {
      status: "Complete",
      priority: "Low",
      title: "Database Optimization",
      content: "Analyze and improve query performance.",
      assigned: ["Emma"],
      comments: [
        { 
          author: "Emma", 
          comment: "Queries optimized successfully.", 
          created: new Date("2024-10-15"),
          likes: 5,
          dislikes: 0
        }
      ],
      created: new Date("2024-10-5"), // Added created property
      due: new Date("2024-10-20"), // Example due date
    },
  ];

  // Combining all tasks into a unified structure for easy management
  const status: StatTask[] = [
    { status: "Incomplete", Task: incompleteTasks },
    { status: "In Progress", Task: inProgressTasks },
    { status: "Complete", Task: completeTasks },
  ];

  // Toggles the visibility of the dashboard and ensures full task view is hidden
  const toggleDashboard = () => {
    if (selectDash === false) {
      setSelectDash(true);
    }
    setRenderFullTask(false);
  };

  return (
    <ThemeContext.Provider value={{ renderFullTask, setRenderFullTask, selectedTask, setSelectedTask }}>
      <div className="flex w-screen h-screen border-blue-600 overflow-y-hidden overflow-x-hidden">
        {/* Sidebar */}
        <div className="flex flex-col w-[304px] h-full shadow-custom-shadow border-r p-[32px] border-r-[#4B5D6A] bg-[#1A2329]">
          {/* Logo Section */}
          <div className="flex border-blue-600 h-max w-max">
            <img src={NudgeLogo} alt="" width={152} />
          </div>
          <div className="mt-[29px] flex flex-col h-screen justify-between">
            {/* Main Menu Section */}
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
              {/* Teams Section */}
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
            {/* Logout Section */}
            <div className="flex h-max items-center justify-center">
              <Button
                leftSection={<IconLogout size="16px" />}
                variant="subtle"
                color="#667988"
                mt="md"
                className="h-[32px] text-[16px] font-light"
                style={{ fontSize: "14px", color: "#667988" }}
                component={Link}
                to={"/"}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#151C21] w-full h-full flex flex-col">
          {/* Header Section */}
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
          {/* Conditional Rendering of Dashboard and Full Task View */}
          {selectDash && !renderFullTask && <DashboardPage StatTask={status} />}
          {renderFullTask && selectedTask && <FullCard TaskContent={selectedTask} />}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default DashBoard;
