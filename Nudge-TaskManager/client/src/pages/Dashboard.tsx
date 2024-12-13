import {
  Input,
  Button,
  Avatar,
  ActionIcon,
  Indicator,
  Menu,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconSearch,
  IconLogout,
  IconBell,
} from "@tabler/icons-react";
import DashboardPage from "./DashboardContent";
import { useState, useEffect } from "react";
import NudgeLogo from "../assets/Group 1.svg";
import { StatTask, TaskContent } from "../interfaces/interfaces";
import { ThemeContext } from "../interfaces/ThemeContext";
import FullCard from "../components/FullCard";

//MARY IMPORTS
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

export const DashBoard: React.FC = () => {
  // State for toggling the empty task when add task is clicked
  const [emptyTask, setEmptyTask] = useState(false)

  // State for toggling the rendering of the dashboard
  const [selectDash, setSelectDash] = useState(true);

  // State for toggling the rendering of the full task view
  const [renderFullTask, setRenderFullTask] = useState(false);

  // State for storing the currently selected task
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);

  // Notifications
  const [notificationClick, setNotification] = useState(false);

  //=> MARY CODE <=//
  const [numericalState, setNumericalState] = useState<number>(0); //PROBLEM: I need to make the default the first team somehow
  const [userId, setUserId] = useState<number | null>(null); // State for user_id
  const [email, setEmail] = useState("");
  const [teams, setTeams] = useState<string[]>([]);
  const [teamNumbers, setTeamNumbers] = useState<number[]>([]);
  const [teamHeader, setTeamHeader] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  //task renders
  const [incompleteTasks, setIncompleteTasks] = useState<TaskContent[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<TaskContent[]>([]);
  const [completeTasks, setCompleteTasks] = useState<TaskContent[]>([]);

  const dummyTask: TaskContent = {
    taskID: 0, // Assuming 0 represents a placeholder ID for an empty task
    teamID: 0, // Placeholder team ID
    status: "", // No status assigned
    priority: "", // No priority assigned
    title: "", // Empty title
    content: "", // No content
    assigned: [], // No one is assigned
    comments: [], // No comments
    created: null, // No creation date
    due: null, // No due date
  };


  useEffect(() => {
    const decodeToken = () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const decoded = jwtDecode<{ user_id: number; email: string }>(token);
          setEmail(decoded.email);
          console.log("Decoded email:", decoded.email);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.warn("No token found in localStorage.");
      }
    };

    const fetchUserId = async (userEmail: string) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/find/email",
          { email: userEmail }
        );
        if (response.data && response.data.user_id) {
          setUserId(response.data.user_id);
          console.log("Fetched user_id:", response.data.user_id);
        } else {
          console.warn("No user_id found for the provided email.");
        }
      } catch (error) {
        console.error("Error fetching user_id from backend:", error);
      }
    };

    decodeToken();

    if (email) {
      fetchUserId(email);
    }
  }, [email]);

  useEffect(() => {
    const fetchTeams = async (userID: number) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/member/find/user/${userID}`
        );
        console.log("Backend response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          const teams = response.data.map(
            (member) => member.Team.team_name || "Unknown Team"
          );
          const team_id = response.data.map((member) => member.team_id || 0);
          setTeams(teams);
          setTeamNumbers(team_id);
          setNumericalState(team_id[0]);
          console.log("Fetched teams:", teams);
        } else {
          console.warn("No members found for the provided user_id.");
        }
      } catch (error) {
        console.error("Error fetching teams from backend:", error);
      }
    };

    if (userId) {
      fetchTeams(userId);
    }
  }, [userId]);

  useEffect(() => {
    setTeamHeader(teams[0]);
  }, [teams]);

  //I think imma just place in the functions here
  useEffect(() => {
    const fetchMembersByTeamId = async (teamId: number) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/team/find/members/${teamId}`
        );

        if (response.data && Array.isArray(response.data)) {
          const usernames = response.data.map((member) => member.username);
          setTeamMembers(usernames);
          console.log("Usernames:", usernames);
        } else {
          console.warn("No members found for the provided team_id.");
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    if (numericalState) {
      fetchMembersByTeamId(numericalState);
    }
  }, [numericalState]);

  useEffect(() => {
    const fetchTasksByTeamId = async (teamId: number) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task/find/team/${teamId}`
        );

        if (Array.isArray(response.data)) {
          console.log("Fetched tasks:", response.data);
          const tasks = response.data.map((task) => ({
            taskID: task.task_id,
            teamID: task.team_id,
            title: task.title,
            content: task.description,
            due: task.due_date ? new Date(task.due_date) : null,
            priority: task.priority,
            status: task.status,
            created: task.created_at ? new Date(task.created_at) : null,
            assigned: [], // Placeholder for teamMembers
            comments: [],
          }));

          const incomplete = tasks.filter((task) => task.status === "pending");
          const inProgress = tasks.filter(
            (task) => task.status === "in-progress"
          );
          const completed = tasks.filter((task) => task.status === "completed");

          setIncompleteTasks(incomplete);
          setInProgressTasks(inProgress);
          setCompleteTasks(completed);
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error:unknown) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          console.warn("No tasks found for the provided team_id.");
          setIncompleteTasks([]);
          setInProgressTasks([]);
          setCompleteTasks([]);
        } else {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    if (numericalState && teamMembers.length > 0) {
      fetchTasksByTeamId(numericalState);
    }
  }, [numericalState, teamMembers]);

  //=>HERE ARE MY METHODS/FUNCTIONS<=//
  const updateCurrentTeam = (index: number) => {
    setTeamHeader(teams[index]);
    const teamNumber = teamNumbers[index];
    //alert(teamNumber);
    setNumericalState(teamNumber);
  };

  // Combining all tasks into a unified structure for easy management
  const status: StatTask[] = [
    { status: "Incomplete", Task: incompleteTasks },
    { status: "In Progress", Task: inProgressTasks },
    { status: "Complete", Task: completeTasks },
  ];

  // Toggle notification
  const notifications = [
    { id: 1, message: "New message from Alice" },
    { id: 2, message: "Reminder: Meeting at 3 PM" },
  ]; // Example notifications array

  // Toggles the visibility of the dashboard and ensures full task view is hidden
  const toggleDashboard = () => {
    if (selectDash === false) {
      setSelectDash(true);
    }
    setRenderFullTask(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        renderFullTask,
        setRenderFullTask,
        selectedTask,
        setSelectedTask,
        numericalState,
        setNumericalState,
        userId,
        setUserId,
        emptyTask,
        setEmptyTask
      }}
    >
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
                    onClick={() => updateCurrentTeam(index)} //bro this just for trial frfr
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
            <div className="text-[#6C899C] text-[32px]">{teamHeader}</div>
            <div className="flex items-center">
              <ActionIcon
                variant="transparent"
                color="gray"
                onClick={() => setNotification(!notificationClick)}
              >
                <Menu
                  position="bottom-end"
                  shadow="md"
                  opened={notificationClick}
                  onClose={() => setNotification(false)}
                >
                  <Menu.Target>
                    <ActionIcon
                      variant="transparent"
                      color="gray"
                      onClick={() => setNotification(!notificationClick)}
                    >
                      {notifications.length === 0 ? (
                        <IconBell size={32} color="#4A5568" />
                      ) : (
                        <Indicator
                          inline
                          label=""
                          size={8}
                          offset={5}
                          color="red"
                          position="top-end"
                        >
                          <IconBell size={32} color="#4A5568" />
                        </Indicator>
                      )}
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown className="flex flex-col">
                    <div className="flex w-[308px]">
                      <h1>Notifications</h1>
                    </div>

                    {notifications.length === 0 ? (
                      <Text size="sm" color="dimmed" p="xs">
                        No notifications
                      </Text>
                    ) : (
                      notifications.map((notification) => (
                        <Menu.Item key={notification.id}>
                          {notification.message}
                        </Menu.Item>
                      ))
                    )}
                    <Button
                      fullWidth
                      variant="subtle"
                      color="gray"
                      mt="xs"
                      onClick={() => {
                        setNotification(false); // Close dropdown
                        console.log("View All clicked"); // Add your logic here
                      }}
                    >
                      View All
                    </Button>
                  </Menu.Dropdown>
                </Menu>
              </ActionIcon>
              <div className="ml-[28.4px]">
                <Avatar />
              </div>
            </div>
          </div>
          {/* Conditional Rendering of Dashboard and Full Task View */}
          {selectDash && !renderFullTask && <DashboardPage StatTask={status} />}
          {renderFullTask && selectedTask && (
            <FullCard TaskContent={selectedTask} />
          )}
          {emptyTask && <FullCard TaskContent={dummyTask} />}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default DashBoard;
