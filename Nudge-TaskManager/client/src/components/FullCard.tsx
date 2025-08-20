import {
  Table,
  Avatar,
  Text,
  Input,
  Textarea,
  Button,
  Popover,
  List,
  ListItem,
  ActionIcon,
  Modal, // added
} from "@mantine/core";
import { taskComment, TaskContent } from "../interfaces/interfaces";
import {
  IconProgress,
  IconFlag,
  IconCalendarDue,
  IconUser,
  IconMessage,
  IconArrowLeft,
} from "@tabler/icons-react";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import axios from "axios";
import { TeamMember, ThemeContext } from "../interfaces/ThemeContext";
import React, { useContext } from "react";

const FullCard = ({ TaskContent }: { TaskContent: TaskContent }) => {
  const [taskTitle, setTaskTitle] = useState(
    TaskContent.title || "Enter Title"
  ); //MARY NOTE: Fix this later and make the default title the actual title
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [renderCalendar, setRenderCalendar] = useState(false);
  const [memberList, setMemberList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember[]>([]);
  const [progressDropdownOpen, setProgressDropdownOpen] = useState(false);
  const [progress, setProgress] = useState<string>("INCOMPLETE");
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
  const [priority, setPriority] = useState(""); // Store the selected priority
  const [statusDirty, setStatusDirty] = useState(false);
  const [priorityDirty, setPriorityDirty] = useState(false);

  //MARY STUFF
  const myContext = useContext(ThemeContext);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [assignedMembers, setAssignedMembers] = useState<TeamMember[]>([]);
  const [commentSave, setCommentSave] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [commentsArray, setCommentsArray] = useState<taskComment[]>([]);
  const [buttonPress, setButtonPress] = useState<boolean>(false);
  const [updatingData, setUpdatingData] = useState<boolean>(false);
  const [updateTaskButton, setUpdateTaskButton] = useState<boolean>(false);
  const [addTaskButton, setAddTaskButton] = useState<boolean>(false);
  const [myContent, setMyContent] = useState<string>("");
  const [count, setCount] = useState<boolean[]>([false, false, true]);
  const [placeholderTask, setPlaceholderTask] = useState<TaskContent>({
    taskID: 0, // Placeholder ID
    teamID: myContext?.numericalState ?? 0, // Placeholder team ID
    status: "",
    priority: "",
    title: "",
    content: "",
    assigned: [],
    comments: [],
    created: null,
    due: null,
  });

  // Delete confirmation modal state
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const s = (TaskContent.status || "").toLowerCase();
    if (s === "pending") setProgress("INCOMPLETE");
    else if (s === "in-progress") setProgress("IN-PROGRESS");
    else if (s === "completed") setProgress("COMPLETE");
  }, [TaskContent.status]);

  const handleSave = async () => {
    try {
      if (myContext?.emptyTask) {
        // create
        await createTask(
          {
            ...placeholderTask,
            // make sure you send the latest status/priority
            status: status || "pending",
            priority: priorityNorm || "low",
            title: taskTitle.trim() || "Untitled task",
            content: myContent,
            teamID: myContext.numericalState ?? 0,
          },
          myContext.userId ?? 0
        );
      } else {
        // update
        await updateTask(TaskContent.taskID, {
          ...placeholderTask,
          status: status || TaskContent.status || "pending",
          priority: priorityNorm || TaskContent.priority || "low",
          title: taskTitle.trim() || TaskContent.title,
          content: myContent || TaskContent.content,
          teamID: TaskContent.teamID,
        });
      }

      // common: refresh lists and navigate back
      myContext?.setReloadTasks(true);
      myContext?.setEmptyTask(false);
      myContext?.setSelectedTask?.(null);
      myContext?.setRenderFullTask(false);
      myContext?.setSelectDash(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (dueDate) {
      console.log("Updated Due Date:", formatDate(dueDate));
    }
  }, [dueDate]);

  const createAssignee = async (taskID: number, userID: number) => {
    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.post(
        "http://localhost:3000/api/assignee/create",
        {
          task_id: taskID,
          user_id: userID,
        }
      );

      // Success response
      console.log("Assignee created successfully:", response.data);
      return response.data; // You can return or handle the response as needed
    } catch (error) {
      // Handle error
      let errorMessage = "Unknown error";
      if (typeof error === "object" && error !== null) {
        if (
          "response" in error &&
          typeof (error as { response?: { data?: string } }).response?.data ===
            "string"
        ) {
          errorMessage = (error as { response?: { data?: string } }).response!
            .data!;
        } else if (
          "message" in error &&
          typeof (error as { message?: string }).message === "string"
        ) {
          errorMessage = (error as { message?: string }).message!;
        }
      }
      console.error("Error creating assignee:", errorMessage);
      throw error;
    }
  };

  const normalizePriority = (raw?: string) => (raw || "").toLowerCase();

  const labelByPriority: Record<string, string> = {
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",
  };

  const colorByPriority: Record<string, string> = {
    low: "#12B886", // green
    medium: "#FAB005", // yellow
    high: "#FA5252", // red
  };
  const rawPriority = myContext?.emptyTask
    ? priority
    : priorityDirty
    ? priority
    : TaskContent.priority;

  const priorityNorm = normalizePriority(rawPriority);

  const priorityLabel = labelByPriority[priorityNorm] ?? "N/A";
  const priorityColor = colorByPriority[priorityNorm];

  const normalizeStatus = (raw?: string) => {
    const v = (raw || "").toLowerCase();
    if (v === "incomplete") return "pending";
    if (v === "in-progress") return "in-progress";
    if (v === "complete") return "completed";
    return v; // "pending" | "in-progress" | "completed" | ""
  };

  const labelByStatus: Record<string, string> = {
    pending: "INCOMPLETE",
    "in-progress": "IN-PROGRESS",
    completed: "COMPLETE",
  };

  const colorByStatus: Record<string, string> = {
    pending: "#FA5252", // red
    "in-progress": "#FAB005", // yellow
    completed: "#12B886", // green
  };

  // pick the raw source of truth (when creating/updating you use `progress`, else use TaskContent.status)
  const rawStatus = myContext?.emptyTask
    ? progress
    : statusDirty
    ? progress
    : TaskContent.status;
  const status = normalizeStatus(rawStatus);

  const btnLabel = labelByStatus[status] ?? "N/A";
  const btnColor = colorByStatus[status]; // may be undefined for N/A

  const fetchAssigneessByTaskId = async (taskId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/assignee/find/task/${taskId}`
      );

      if (response.data && Array.isArray(response.data)) {
        const members = response.data.map(
          (member: { user_id: number; username: string }) => ({
            id: member.user_id, // Map the 'id' field
            name: member.username, // Map the 'username' field to 'name'
          })
        );
        setAssignedMembers(members);
        console.log(assignedMembers);
      } else {
        console.warn("No members found for the provided team_id.");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    console.log(selectedMember);
    selectedMember.map((member) => {
      createAssignee(TaskContent.taskID, member.id);
      myContext?.setNotifPasser({
        notification_id: null,
        user_id: member.id,
        task_id: TaskContent.taskID,
        message: `You have now been assigned to task - "${TaskContent.taskID}"`,
        message_type: "task-update",
        sent_at: new Date(),
      });
      myContext?.setReloadNotif(true);
    });
    fetchAssigneessByTaskId(TaskContent.taskID);
  }, [selectedMember]);

  useEffect(() => {
    fetchAssigneessByTaskId(TaskContent.taskID);
  }, [myContext?.renderFullTask]);

  useEffect(() => {
    console.log(assignedMembers);
  }, [assignedMembers]);

  const fetchUsername = async (userID: number): Promise<string> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/find/${userID}`
      );
      return response.data.username; // Assuming the API returns { username: "JohnDoe" }
    } catch (error) {
      console.error(`Error fetching username for user_id ${userID}:`, error);
      return "Unknown"; // Fallback if username fetch fails
    }
  };

  // when changing STATUS
  const handleProgressChange = (index: number) => {
    const newProgress =
      index === 0 ? "INCOMPLETE" : index === 1 ? "IN-PROGRESS" : "COMPLETE";
    setProgress(newProgress);
    setStatusDirty(true); // <— important
    setProgressDropdownOpen(false);
    setUpdatingData(true); // you can still keep this for enabling the Save button
  };

  // when changing PRIORITY
  const handlePriorityChange = (index: number) => {
    const levels = ["LOW", "MEDIUM", "HIGH"];
    setPriority(levels[index]);
    setPriorityDirty(true); // <— important
    setPriorityDropdownOpen(false);
    setUpdatingData(true);
  };

  const fetchComments = async (taskID: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comment/find/task/${taskID}`
      );

      if (response.data) {
        // Map comments and fetch usernames
        const formattedComments: taskComment[] = await Promise.all(
          response.data.map(
            async (comment: {
              user_id: number;
              content: string;
              created_at: string;
            }) => {
              const username = await fetchUsername(comment.user_id);
              return {
                author: username, // Use fetched username
                comment: comment.content,
                created: new Date(comment.created_at),
              };
            }
          )
        );

        // Update state
        setCommentsArray(formattedComments);
        console.log("Comments fetched successfully:", formattedComments);
      } else {
        console.log("No comments found for this task.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const createComment = async () => {
    if (commentText.trim() === "") {
      console.log("Comment text is empty!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/comment/create",
        {
          content: commentText,
          task_id: TaskContent.taskID, // Example of passing task ID
          user_id: myContext?.userId, // Replace with actual user ID from your app
        }
      );

      console.log("Comment created successfully:", response.data);
      setCommentText(""); // Clear the input field after success
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  useEffect(() => {
    if (myContext?.renderFullTask === true && myContext.emptyTask === false) {
      fetchComments(TaskContent.taskID);
      console.log("Here it is...", commentsArray);
    }
  }, [myContext?.renderFullTask]);

  useEffect(() => {
    if (commentSave === true) {
      createComment();
    }
    fetchComments(TaskContent.taskID);
    setCommentSave(false);

    assignedMembers.map((member) => {
      createAssignee(TaskContent.taskID, member.id);
      myContext?.setNotifPasser({
        notification_id: null,
        user_id: member.id,
        task_id: TaskContent.taskID,
        message: `New comment on task ${TaskContent.taskID}`,
        message_type: "reminder",
        sent_at: new Date(),
      });
      myContext?.setReloadNotif(true);
    });
  }, [commentSave]);

  const createTask = async (currTask: TaskContent, userID: number) => {
    try {
      const newTask = {
        title: currTask.title,
        description: currTask.content,
        admin_id: userID,
        team_id: currTask.teamID,
        due_date: dueDate,
        status: currTask.status,
        priority: currTask.priority,
      };

      const response = await axios.post(
        "http://localhost:3000/api/task/create",
        newTask
      );
      console.log(response);

      console.log("Task created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const newTaskAdder = async () => {
    try {
      console.log("Creating task...");
      await createTask(placeholderTask, myContext?.userId ?? 0);
      console.log("Task created successfully.");
      myContext?.setRenderFullTask(false);
      myContext?.setReloadTasks(true);
      setAddTaskButton(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const updateTask = async (
    taskID: number,
    updatedTask: TaskContent
  ): Promise<TaskContent> => {
    try {
      if (!taskID || typeof taskID !== "number") {
        throw new Error("Invalid task ID.");
      }

      if (!myContext?.userId) {
        throw new Error("User ID is not available in context.");
      }

      const taskData = {
        title: updatedTask.title || TaskContent?.title || "Default Title",
        description:
          updatedTask.content || TaskContent?.content || "Default Description",
        admin_id: myContext.userId,
        team_id: updatedTask.teamID || TaskContent?.teamID || 0,
        due_date: new Date(),
        status: updatedTask.status || TaskContent?.status || "pending",
        priority: updatedTask.priority || TaskContent?.priority || "low",
      };

      const { data } = await axios.put(
        `http://localhost:3000/api/task/update/${taskID}`,
        taskData
      );

      console.log("Task updated successfully:", data);
      return data;
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === "string"
      ) {
        console.error(
          "Backend error:",
          (error as { response: { data: { message: string } } }).response.data
        );
      } else if (
        typeof error === "object" &&
        error !== null &&
        "request" in error
      ) {
        console.error(
          "No response received from backend:",
          (error as { request: unknown }).request
        );
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message?: string }).message === "string"
      ) {
        console.error(
          "Error during request setup:",
          (error as { message: string }).message
        );
      } else {
        console.error("An unexpected error occurred.");
      }
      throw new Error(
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === "string"
          ? (error as { response: { data: { message: string } } }).response.data
              .message
          : typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: string }).message === "string"
          ? (error as { message: string }).message
          : "An unexpected error occurred."
      );
    }
  };

  const deleteTask = async (taskID: number): Promise<void> => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/task/delete/${taskID}`
      );
      console.log("Task deleted successfully:", response.data);
    } catch (error: unknown) {
      let errorMessage =
        "An unexpected error occurred while deleting the task.";
      if (typeof error === "object" && error !== null) {
        if (
          "response" in error &&
          typeof (error as { response?: { data?: { message?: string } } })
            .response?.data?.message === "string"
        ) {
          errorMessage = (
            error as { response?: { data?: { message?: string } } }
          ).response!.data!.message!;
        } else if (
          "message" in error &&
          typeof (error as { message?: string }).message === "string"
        ) {
          errorMessage = (error as { message?: string }).message!;
        }
      }
      console.error("Error deleting task:", errorMessage);
      alert(errorMessage);
    }
  };

  useEffect(() => {
    if (
      count.every((val) => val === true) &&
      myContext?.userId &&
      addTaskButton
    ) {
      newTaskAdder();
    }
  }, [count, myContext?.userId, addTaskButton]);

  useEffect(() => {
    console.log(placeholderTask);
  }, [placeholderTask]);

  useEffect(() => {
    myContext?.setReloadTasks(true);
    setUpdateTaskButton(false);
    if (buttonPress === true) {
      setUpdatingData(false);
      setButtonPress(false);
    }
  }, [updateTaskButton, buttonPress]);

  const progressArr = [
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color={"#FA5252"}
      onClick={() => {
        setPlaceholderTask((prevTask) => ({
          ...prevTask,
          status: "pending",
        }));
        if (myContext?.emptyTask === false) {
          setUpdatingData(true);
        }
      }}
    >
      INCOMPLETE
    </Button>,
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color={"#FAB005"}
      onClick={() => {
        setPlaceholderTask((prevTask) => ({
          ...prevTask,
          status: "in-progress",
        }));
        if (myContext?.emptyTask === false) {
          setUpdatingData(true);
        }
      }}
    >
      IN-PROGRESS
    </Button>,

    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color={"#12B886"}
      key="status-badge" // Always add a key when creating components dynamically
      onClick={() => {
        setPlaceholderTask((prevTask) => ({
          ...prevTask,
          status: "completed",
        }));
        if (myContext?.emptyTask === false) {
          setUpdatingData(true);
        }
      }}
    >
      COMPLETE
    </Button>,
  ];

  const filteredMembers = myContext?.teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const priorityArr = [
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color="#12B886"
      leftSection={<IconFlag size="20" />}
      onClick={() => {
        setPlaceholderTask((prevTask) => ({
          ...prevTask,
          priority: "low",
        }));
        if (myContext?.emptyTask === true) {
          setCount((prevCount) => {
            const newCount = [...prevCount];
            newCount[1] = true;
            return newCount;
          });
        } else {
          setUpdatingData(true);
        }
      }}
    >
      LOW
    </Button>,
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color="#FAB005"
      leftSection={<IconFlag size="20" />}
      onClick={() => {
        setPlaceholderTask((prevTask) => ({
          ...prevTask,
          priority: "medium",
        }));
        if (myContext?.emptyTask === true) {
          setCount((prevCount) => {
            const newCount = [...prevCount];
            newCount[1] = true;
            return newCount;
          });
        } else {
          setUpdatingData(true);
        }
      }}
    >
      MEDIUM
    </Button>,
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color="#FA5252"
      leftSection={<IconFlag size="20" />}
      //onClick={() => alert("hello")}
      onClick={() => {
        setPlaceholderTask((prevTask) => ({
          ...prevTask,
          priority: "high",
        }));
        if (myContext?.emptyTask === true) {
          setCount((prevCount) => {
            const newCount = [...prevCount];
            newCount[1] = true;
            return newCount;
          });
        } else {
          setUpdatingData(true);
        }
      }}
    >
      HIGH
    </Button>,
  ];

  interface HandleSelectMemberArg {
    id: number;
    name: string;
  }

  const handleSelectMember = (member: HandleSelectMemberArg) => {
    setSelectedMember((prevMember: TeamMember[]) => {
      if (prevMember.some((m) => m.id === member.id)) {
        // Member is already in the list, don't add again
        return prevMember;
      }
      return [...prevMember, member];
    });
    //axios create new assignee
    setMemberList(false);
    // Add logic to handle assignment to the task
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
    if (myContext?.emptyTask === false) {
      setUpdatingData(true);
    }
    //setPlaceholderTask((prevTask) => ({ ...prevTask, title: event.target.value }));
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    setPlaceholderTask((prevTask) => ({
      ...prevTask,
      title: taskTitle,
    }));
    setCount((prevCount) => {
      const newCount = [...prevCount]; // Make a copy of the current count array
      newCount[0] = true; // Update the first element of the array
      return newCount; // Return the updated array
    });
  };

  const handleContentBlur = () => {
    //setIsEditingTitle(false);
    setPlaceholderTask((prevTask) => ({
      ...prevTask,
      content: myContent,
    }));
  };

  const commentBlur = () => {
    setCommentSave(true);
  };

  const keyDownComments = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      setCommentSave(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPlaceholderTask((prevTask) => ({
        ...prevTask,
        title: taskTitle,
      }));

      setCount((prevCount) => {
        const newCount = [...prevCount];
        newCount[0] = true;
        return newCount;
      });
    }
  };

  //Function to format start date and due date of task
  const formatDate = (date: Date | string | null) => {
    if (!date) {
      console.log("This is date data:", date);
      return false;
    }

    const validDate = new Date(date as string | number | Date);
    if (isNaN(validDate.getTime())) {
      // If the date is invalid, return false
      return false;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(validDate);
  };

  const mapAssigned = () => {
    return TaskContent.assigned.map((assignee) => assignee).join(", ");
  };

  //This is an object array that contains the contents to be rendered for the Task Specifications
  const taskSpecifications = [
    {
      label: "Due Date",
      icon: <IconCalendarDue size={16} />,
      value: myContext?.emptyTask ? (
        dueDate != null ? (
          formatDate(dueDate)
        ) : (
          <Popover
            position="bottom"
            withArrow
            shadow="md"
            opened={renderCalendar}
            onClose={() => setRenderCalendar(false)}
          >
            <Popover.Target>
              <Button
                variant="filled"
                color="#688193"
                className="h-[90%] text-[13px]"
                onClick={() => {
                  setRenderCalendar(!renderCalendar);
                }}
              >
                Set Due Date
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <DatePicker value={dueDate} onChange={setDueDate} />
            </Popover.Dropdown>
          </Popover>
        )
      ) : (
        formatDate(TaskContent.due)
      ), // Fallback message
    },
    {
      label: "Progress",
      icon: <IconProgress size={16} />,
      value: (
        <Popover
          position="bottom"
          withArrow
          shadow="md"
          opened={progressDropdownOpen}
          onClose={() => {
            setProgressDropdownOpen(false);
          }}
        >
          <Popover.Target>
            <Button
              variant="filled"
              size="xs"
              className="rounded-[20px] h-[20px]"
              color={btnColor || undefined} // don't pass ""
              onClick={() => setProgressDropdownOpen((o) => !o)}
            >
              {btnLabel}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <div>
              {progressArr.map((badge, index) => (
                <div
                  key={index}
                  style={{ cursor: "pointer", padding: "5px 10px" }}
                  onClick={() => handleProgressChange(index)}
                >
                  {badge}
                </div>
              ))}
            </div>
          </Popover.Dropdown>
        </Popover>
      ),
    },
    {
      label: "Priority",
      icon: <IconFlag size={16} />,
      value: (
        <Popover
          position="bottom"
          withArrow
          shadow="md"
          opened={priorityDropdownOpen}
          onClose={() => setPriorityDropdownOpen(false)}
        >
          <Popover.Target>
            <Button
              variant="filled"
              size="xs"
              className="rounded-[20px] h-[20px]"
              color={priorityColor || undefined} // don’t pass ""
              onClick={() => setPriorityDropdownOpen((o) => !o)}
            >
              <IconFlag
                size="15"
                className="mr-[5px] flex items-center justify-center"
              />
              {priorityLabel}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <div>
              {priorityArr.map((badge, index) => (
                <div
                  key={index}
                  style={{ cursor: "pointer", padding: "5px 10px" }}
                  onClick={() => handlePriorityChange(index)}
                >
                  {badge}
                </div>
              ))}
            </div>
          </Popover.Dropdown>
        </Popover>
      ),
    },
    {
      label: "Assignees",
      icon: <IconUser size={16} />,
      value:
        mapAssigned() === "" ? (
          <Popover
            position="bottom"
            withArrow
            shadow="md"
            opened={memberList}
            onClose={() => setMemberList(false)}
          >
            <Popover.Target>
              <Button
                variant="filled"
                color="#688193"
                className="h-[90%] text-[13px]"
                onClick={() => setMemberList(!memberList)}
              >
                {"Assign Member"}
              </Button>
            </Popover.Target>
            <text>
              {myContext?.emptyTask
                ? selectedMember.map((item) => (
                    <span key={item.id}>{item.name}</span>
                  ))
                : assignedMembers.map((item) => (
                    <span key={item.id}>{item.name}</span>
                  ))}
            </text>
            <Popover.Dropdown>
              <Input
                placeholder="Search for a member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb="xs"
              />
              {filteredMembers && filteredMembers.length > 0 ? (
                <List>
                  {filteredMembers.map((member) => (
                    <ListItem
                      key={member.id}
                      onClick={() => handleSelectMember(member)}
                      style={{ cursor: "pointer", padding: "5px 10px" }}
                    >
                      {member.name}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text size="xs">No members found</Text>
              )}
            </Popover.Dropdown>
          </Popover>
        ) : (
          mapAssigned()
        ),
    },
  ];

  const openDeleteModal = () => setConfirmDeleteOpen(true);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteTask(TaskContent.taskID);
      myContext?.setReloadTasks(true);
      myContext?.setSelectedTask?.(null);
      myContext?.setEmptyTask(false);
      myContext?.setRenderFullTask(false);
      myContext?.setSelectDash(true);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
      setConfirmDeleteOpen(false);
    }
  };

  return (
    <div className="flex flex-col text-white border-red-600 w-[100%] h-full p-[24px] overflow-y-auto scrollbar-hide">
      {/*------------------------------! TASK TITLE DIV !------------------------------------*/}
      <ActionIcon
        variant="transparent"
        color="#B7CDDE"
        onClick={() => {
          myContext?.setEmptyTask(false);
          myContext?.setSelectedTask?.(null);
          myContext?.setRenderFullTask(false);
          myContext?.setSelectDash(true);
        }}
        className="mb-[20px]"
      >
        <IconArrowLeft />
      </ActionIcon>
      <div className="flex w-full justify-between">
        <div className="flex border-red-600 w-[90%] h-max mb-4">
          {isEditingTitle ? (
            <Input
              value={taskTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              variant="unstyled"
              className="border-red-600 flex w-full"
              styles={{
                input: {
                  color: "#B7CDDE", // Text color
                  fontSize: "25px", // Font size
                  "::placeholder": {
                    color: "#B7CDDE", // Placeholder text color
                  },
                },
              }}
            />
          ) : (
            <div
              className="text-[#B7CDDE] w-full cursor-pointer text-[35px]"
              onClick={() => setIsEditingTitle(true)}
            >
              {myContext?.emptyTask
                ? taskTitle
                : updatingData
                ? taskTitle
                : TaskContent.title}
            </div>
          )}
        </div>
        <div className="flex w-[12%] justify-between">
          {!myContext?.emptyTask && (
            <Button variant="outline" color="red" onClick={openDeleteModal}>
              Delete
            </Button>
          )}

          <Button
            variant="light"
            color="#B7CDDE"
            onClick={handleSave}
            disabled={
              myContext?.emptyTask
                ? count.some((val) => val === false)
                : updatingData === false
            }
          >
            SAVE
          </Button>
        </div>
      </div>
      {/*------------------------------! TASK TITLE DIV !------------------------------------*/}
      {/*------------------------------! TABLE COMPONENT (TASK SPECIFICATIONS) !------------------------------------*/}
      <div>
        {myContext?.emptyTask ? (
          ""
        ) : (
          <div>
            <tr className="mb-[10px] flex w-[35%] justify-between">
              <td className="flex items-center space-x-2">
                {<IconCalendarDue size={16} />}
                <span className="text-[#B7CDDE] text-[16px]">Start Date</span>
              </td>
              <td className="text-[#B7CDDE] w-[150px] text-[16px] flex justify-center">
                {formatDate(TaskContent.created)}
              </td>
            </tr>
          </div>
        )}
      </div>
      <Table verticalSpacing="md">
        <tbody>
          {taskSpecifications.map((spec, index) => (
            <tr key={index} className="mb-[10px] flex w-[35%] justify-between">
              <td className="flex items-center space-x-2">
                {spec.icon}
                <span className="text-[#B7CDDE] text-[16px]">{spec.label}</span>
              </td>
              <td className="text-[#B7CDDE] w-[150px] text-[16px] flex justify-center">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/*------------------------------! TABLE COMPONENT (TASK SPECIFICATIONS) !------------------------------------*/}
      {/*------------------------------! TASK DESCRIPTION MAIN DIV !------------------------------------*/}
      <div className="border-t border-b mt-[32px] flex flex-col w-[] h-max pb-[2%]">
        <div className="text-[24px] pt-[2%] pb-[1.5%] text-[#B7CDDE]">
          Task Description
        </div>
        <div
          className="h-max w-full text-[16px]"
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {" "}
          {/*TASK DESCRIPTION CONTENT DIV*/}
          {TaskContent.content.length === 0 ? (
            <div className="text-[#88A7BD]">
              <Textarea
                value={myContent}
                placeholder="Enter a task description..."
                variant="unstyled"
                autosize
                styles={{
                  input: {
                    color: "#C9C9C9",
                  },
                }}
                onBlur={handleContentBlur}
                onChange={(e) => setMyContent(e.target.value)}
              />
            </div>
          ) : (
            <div className="text-[#88A7BD]">
              <Textarea
                value={myContent}
                placeholder={
                  updatingData
                    ? "Enter a new task description..."
                    : TaskContent.content
                }
                variant="unstyled"
                autosize
                styles={{
                  input: {
                    color: "#C9C9C9",
                  },
                }}
                onBlur={() => {
                  handleContentBlur();
                  setUpdateTaskButton(true);
                  setUpdatingData(true);
                }}
                onChange={(e) => {
                  setMyContent(e.target.value);
                }}
              />
            </div>
          )}
          {""}
        </div>
      </div>
      {!myContext?.emptyTask && (
        <div className="flex flex-col mt-[24px] text-[20px] w-full h-max">
          <div className="flex justify-between 2xl:w-[9%] lg:w-[13%] items-center border-red-600 text-[#B7CDDE]">
            <IconMessage />
            Comments
          </div>
          <Textarea
            value={commentText}
            placeholder="Write a comment..."
            autosize
            minRows={3}
            maxRows={6}
            className="mt-2 placeholder:[#C9C9C9]"
            variant="filled"
            onKeyDown={keyDownComments}
            onBlur={commentBlur}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setCommentText(event.target.value);
            }}
          />
          {TaskContent.comments.length === 0 && (
            <div className="flex w-full justify-center items-center mt-[5%]  text-[#B7CDDE]">
              {" "}
              No Comments{" "}
            </div>
          )}

          {commentsArray.map((comment, index) => (
            <div
              key={index}
              className="flex flex-col text-[16px] mt-[32px] bg-opacity-[10%]"
            >
              {/* COMMENT DIV */}
              <div className="flex items-center border-red-600 w-full">
                <div className="flex w-max h-max  border-green-600">
                  <Avatar size="48" />
                  <div className="flex ml-[8px] flex-col">
                    <div className="flex items-center border-green-600 w-full">
                      <h1 className="mr-[10px] text-[14px] text-[#B7CDDE]">
                        {commentsArray[index].author}
                      </h1>
                      <h1 className="text-[14px] text-[#6C899C]">
                        {formatDate(comment.created)}
                      </h1>
                    </div>
                    <Text
                      className="text-[14px] w-full border-red-600 flex text-white"
                      style={{
                        wordBreak: "break-word", // Break words for long content
                        overflowWrap: "break-word", // Ensure proper wrapping
                      }}
                    >
                      {comment.comment}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <Modal
        opened={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        title="Delete Task"
        centered
      >
        <Text c="dimmed" mb="md">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </Text>
        <div className="flex justify-end gap-2">
          <Button
            variant="default"
            onClick={() => setConfirmDeleteOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete} loading={deleting}>
            Delete
          </Button>
        </div>
      </Modal>
      {/*------------------------------! TASK DESCRIPTION MAIN DIV !------------------------------------*/}
    </div>
  );
};

export default FullCard;
