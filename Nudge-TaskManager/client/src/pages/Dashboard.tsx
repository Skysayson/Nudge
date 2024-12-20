import {
  Input,
  Button,
  Avatar,
  ActionIcon,
  Indicator,
  Menu,
  Text,
  Drawer,
  Burger,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconSearch,
  IconLogout,
  IconBell,
  IconX,
} from "@tabler/icons-react";
import DashboardPage from "./DashboardContent";
import { useState, useEffect } from "react";
import NudgeLogo from "../assets/Group 1.svg";
import { StatTask, TaskContent } from "../interfaces/interfaces";
import {
  ThemeContext,
  TeamMember,
  NotifContent,
} from "../interfaces/ThemeContext";
import FullCard from "../components/FullCard";
import { useDisclosure } from "@mantine/hooks";

//MARY IMPORTS
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const DashBoard: React.FC = () => {
  // State for toggling the empty task when add task is clicked
  const [emptyTask, setEmptyTask] = useState(false);

  // State for toggling the rendering of the dashboard
  const [selectDash, setSelectDash] = useState(true);

  // State for toggling the rendering of the full task view
  const [renderFullTask, setRenderFullTask] = useState(false);

  // State for storing the currently selected task
  const [selectedTask, setSelectedTask] = useState<TaskContent | null>(null);

  // Notifications
  const [notificationClick, setNotification] = useState(false);

  // SideBar Drawer
  const [opened, { open, close }] = useDisclosure(false);

  // Sort Api Tasks
  const [sort, setSort] = useState<string>("");

  //=> MARY CODE <=//
  const [notifPasser, setNotifPasser] = useState<NotifContent>({
    notification_id: null,
    user_id: null,
    task_id: null,
    message: "",
    message_type: "",
    sent_at: new Date(),
  });

  const [commentsLength, setCommentsLength] = useState<number>(0);
  const [reloadTasks, setReloadTasks] = useState<boolean>(false);
  const [numericalState, setNumericalState] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [teams, setTeams] = useState<string[]>([]);
  const [teamNumbers, setTeamNumbers] = useState<number[]>([]);
  const [teamHeader, setTeamHeader] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const dummyTask: TaskContent = {
    taskID: 0,
    teamID: 0,
    status: "",
    priority: "",
    title: "",
    content: "",
    assigned: [],
    comments: [],
    created: null,
    due: null,
  };

  //task renders
  const [reloadNotif, setReloadNotif] = useState<boolean>(false);
  const [notifArray, setNotifArray] = useState<NotifContent[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<TaskContent[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<TaskContent[]>([]);
  const [completeTasks, setCompleteTasks] = useState<TaskContent[]>([]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("jwtToken");

    console.log("Token after removal:", localStorage.getItem("jwtToken"));

    navigate("/");
  };

  const createNotification = async (payload: NotifContent) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/notification/create",
        {
          message: payload.message || null,
          message_type: payload.message_type,
          task_id: payload.task_id,
          user_id: payload.user_id,
          sent_at: payload.sent_at,
        }
      );

      console.log("Notification created successfully:", response.data);
      return response.data; // Return response for further use if needed
    } catch (error) {
      console.error("Error creating notification:", error.message);
      throw error; // Re-throw for higher-level error handling
    }
  };

  const fetchNotifications = async (userID: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/notification/find/user/${userID}`
      );
      console.log("Backend response:", response.data);

      if (response.data && Array.isArray(response.data)) {
        const notifications = response.data.map(
          (notif: {
            notification_id: number;
            user_id: number;
            task_id: number;
            message_type: string;
            message: string;
            sent_at: Date;
          }) => ({
            notification_id: notif.notification_id,
            user_id: notif.user_id,
            task_id: notif.user_id,
            message_type: notif.message_type,
            message: notif.message,
            sent_at: notif.sent_at,
          })
        );
        setNotifArray(notifications);
        console.log("Fetched notifications:", notifArray);
      } else {
        console.warn("No notifications found for the provided user_id.");
      }
    } catch (error) {
      console.error("Error fetching norifications from backend:", error);
    }
  };

  useEffect(() => {
    if (reloadNotif === true) {
      createNotification(notifPasser);
      fetchNotifications(userId);
      setReloadNotif(false);
    }
  }, [reloadNotif]);

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
          const teamMembers = response.data.map(
            (member: { user_id: number; username: string }) => ({
              id: member.user_id, // Map the 'id' field
              name: member.username, // Map the 'username' field to 'name'
            })
          );
          setTeamMembers(teamMembers);
          console.log(teamMembers);
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

          // Sort Logic
          if (sort === "Low to High") {
            const priorityOrder: Record<string, number> = {
              low: 1,
              medium: 2,
              high: 3,
            };
            const sortedTasks = tasks.sort((a, b) => {
              return (
                (priorityOrder[a.priority] || 0) -
                (priorityOrder[b.priority] || 0)
              );
            });

            console.log(`SORT VALUE: ${sort}`);

            // Now filter by status after sorting
            const incomplete = sortedTasks.filter(
              (task) => task.status === "pending"
            );
            const inProgress = sortedTasks.filter(
              (task) => task.status === "in-progress"
            );
            const completed = sortedTasks.filter(
              (task) => task.status === "completed"
            );

            setIncompleteTasks(incomplete);
            setInProgressTasks(inProgress);
            setCompleteTasks(completed);
          } else if (sort === "High to Low") {
            const priorityOrder: Record<string, number> = {
              low: 3,
              medium: 2,
              high: 1,
            };
            const sortedTasks = tasks.sort((a, b) => {
              return (
                (priorityOrder[a.priority] || 0) -
                (priorityOrder[b.priority] || 0)
              );
            });

            // Now filter by status after sorting
            const incomplete = sortedTasks.filter(
              (task) => task.status === "pending"
            );
            const inProgress = sortedTasks.filter(
              (task) => task.status === "in-progress"
            );
            const completed = sortedTasks.filter(
              (task) => task.status === "completed"
            );

            setIncompleteTasks(incomplete);
            setInProgressTasks(inProgress);
            setCompleteTasks(completed);
          } else if (sort === "Due Date") {
            const sortedTasks = tasks.sort((a, b) => {
              if (a.due && b.due) {
                return a.due.getTime() - b.due.getTime(); // Ascending order
              } else if (a.due && !b.due) {
                return -1; // Tasks with due date come first
              } else if (!a.due && b.due) {
                return 1; // Tasks without due date come last
              }
              return 0; // If both are null, leave unchanged
            });

            // Now filter by status after sorting
            const incomplete = sortedTasks.filter(
              (task) => task.status === "pending"
            );
            const inProgress = sortedTasks.filter(
              (task) => task.status === "in-progress"
            );
            const completed = sortedTasks.filter(
              (task) => task.status === "completed"
            );

            setIncompleteTasks(incomplete);
            setInProgressTasks(inProgress);
            setCompleteTasks(completed);
          } else {
            const incomplete = tasks.filter(
              (task) => task.status === "pending"
            );
            const inProgress = tasks.filter(
              (task) => task.status === "in-progress"
            );
            const completed = tasks.filter(
              (task) => task.status === "completed"
            );

            setIncompleteTasks(incomplete);
            setInProgressTasks(inProgress);
            setCompleteTasks(completed);
          }

          // checking if state is being passed via context
          console.log(`SORT VALUE: ${sort}`);

          // Now filter by status after sorting
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error: unknown) {
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

    if ((numericalState && teamMembers.length > 0) || reloadTasks === true) {
      fetchTasksByTeamId(numericalState);
      setReloadTasks(false);
      console.log(reloadTasks);
    }
  }, [numericalState, teamMembers, reloadTasks, sort]);

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

  // Toggles the visibility of the dashboard and ensures full task view is hidden
  const toggleDashboard = () => {
    if (selectDash === false) {
      setSelectDash(true);
    }
    setRenderFullTask(false);
    setEmptyTask(false);
  };

  console.log(`EmptyTask in Dashboard` + emptyTask);

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
        setEmptyTask,
        teamMembers,
        setTeamMembers,
        reloadTasks,
        setReloadTasks,
        sort,
        setSort,
        notifPasser,
        setNotifPasser,
        reloadNotif,
        setReloadNotif,
        commentsLength,
        setCommentsLength,
      }}
    >
      <div className="flex max-sm:w-[1000px] max-sm:h-screen w-screen h-screen border-blue-600 overflow-y-hidden">
        {/* Sidebar */}
        <div className="flex max-lg:hidden flex-col w-[304px] h-full shadow-custom-shadow border-r p-[32px] border-r-[#4B5D6A] bg-[#1A2329]">
          {/* Logo Section */}
          <div className="flex border-blue-600 h-max w-max">
            <img src={NudgeLogo} alt="" width={152} />
          </div>
          <div className="mt-[29px] flex flex-col h-screen justify-between">
            {/* Main Menu Section */}
            <div className="flex flex-col">
              {/* <Input
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
              /> */}
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
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
        {/*BURGER SIDEBAR*/}
        <Drawer
          opened={opened}
          onClose={close}
          size="60%"
          className="flex flex-col w-full border-red-600 h-full shadow-custom-shadow border-r"
          styles={{
            content: {
              backgroundColor: "#1A2329", // Custom background color
            },
            header: {
              backgroundColor: "#1A2329",
            },
          }}
        >
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
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </Drawer>

        {/* Main Content */}
        <div className="bg-[#151C21] w-full h-full flex flex-col">
          {/* Header Section */}
          <div className="flex items-center pl-[24px] pr-[24px] justify-between shadow-custom-shadow w-full border-b border-[#4B5D6A] min-h-[60px] bg-[#1A2329]">
            <ActionIcon
              variant="transparent"
              onClick={open}
              className="lg:hidden"
            >
              <Burger color="#6C899C" />
            </ActionIcon>
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
                      {notifArray.length === 0 ? (
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

                  <Menu.Dropdown className="flex flex-col p-2 bg-[#485560] border-none">
                    <div className="flex items-center justify-between mb-3">
                      <h1 className="text-lg font-semibold text-[#ECF1F6]">
                        Notifications
                      </h1>
                      <ActionIcon
                        variant="transparent"
                        color="gray"
                        onClick={() => setNotification(false)}
                      >
                        <IconX size={20} />
                      </ActionIcon>
                    </div>

                    {notifArray.length === 0 ? (
                      <Text size="sm" color="dimmed" p="xs">
                        No notifications
                      </Text>
                    ) : (
                      notifArray.map((notification) => (
                        <div
                          key={notification.notification_id}
                          className="flex items-center justify-between p-2 my-1 rounded-lg hover:bg-gray-500 hover:cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <IconBell size={20} color="gray" />
                            <Text size="sm" className="text-[#ECF1F6]">
                              {notification.message}
                            </Text>
                          </div>
                          <ActionIcon
                            variant="transparent"
                            color="gray"
                            size={18}
                          >
                            <IconX size={16} />
                          </ActionIcon>
                        </div>
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
          {selectDash && !renderFullTask && !emptyTask && (
            <DashboardPage StatTask={status} />
          )}
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
