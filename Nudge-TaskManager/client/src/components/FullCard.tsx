import {
  Badge,
  Table,
  Avatar,
  Text,
  Input,
  Textarea,
  Button,
  Popover,
  List,
  ListItem,
} from "@mantine/core";
import { TaskContent } from "../interfaces/interfaces";
import {
  IconCalendar,
  IconProgress,
  IconFlag,
  IconCalendarDue,
  IconUser,
  IconMessage,
  IconThumbUp,
  IconThumbDown,
} from "@tabler/icons-react";
import { Calendar } from "@mantine/dates";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../interfaces/ThemeContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const FullCard = ({ TaskContent }: { TaskContent: TaskContent }) => {
  const [statusColor, setStatusColor] = useState("");
  const [priorityColors, setPriorityColors] = useState("");
  const [taskTitle, setTaskTitle] = useState("Enter Title"); //MARY NOTE: Fix this later and make the default title the actual title
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [renderCalendar, setRenderCalendar] = useState(false);
  const [memberList, setMemberList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startCalendar, setStartCalendar] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [progressDropdownOpen, setProgressDropdownOpen] = useState(false);
  const [progress, setProgress] = useState<string>("INCOMPLETE");
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
  const [priority, setPriority] = useState(""); // Store the selected priority

  //MARY STUFF
  const myContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const [myContent, setMyContent] = useState<string>("");
  const [count, setCount] = useState<boolean[]>([false, false, true]);
  const [dummyTask, setDummyTask] = useState<TaskContent>({
    taskID: 0, // Placeholder ID
    teamID: myContext?.numericalState | undefined, // Placeholder team ID
    status: "pending",
    priority: "",
    title: "my",
    content: "",
    assigned: [],
    comments: [],
    created: null,
    due: null,
  });

  const createTask = async (currTask: TaskContent, userID: number) => {
    try {
      // Preparing task data
      const newTask = {
        title: currTask.title,
        description: currTask.content,
        admin_id: userID,
        team_id: currTask.teamID,
        due_date: new Date(),
        status: currTask.status,
        priority: currTask.priority,
      };

      // API call to create a new task
      const response = await axios.post(
        "http://localhost:3000/api/task/create",
        newTask
      );
      console.log(response);

      // setDummyTask({
      //   taskID: 0, // Placeholder ID
      //   teamID: myContext?.numericalState, // Placeholder team ID
      //   status: "pending",
      //   priority: "",
      //   title: "",
      //   content: "",
      //   assigned: [],
      //   comments: [],
      //   created: null,
      //   due: null,
      // });

      // Handle success
      console.log("Task created successfully:", response.data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error creating task:", error);
      throw error; // You can choose to throw or handle the error as needed
    }
  };

  // {
  //   "title": "imma cry",
  //   "description": "Finalize and submit the project report",
  //   "due_date": "2024-12-15T12:00:00Z",
  //   "priority": "low",
  //   "status": "completed",
  //   "team_id": 1,
  //   "admin_id": 1
  // }

  useEffect(() => {
    if (count.every((val) => val === true) && myContext?.userId) {
      // Prevent duplicate task creation
      createTask(dummyTask, myContext.userId)
        .then(() => {
          console.log("Task created successfully!");
          setCount([false, false, false]); // Reset count or add more logic to manage it
        })
        .catch((error) => console.error("Failed to create task:", error));
    }
  }, [count, myContext?.userId]); // Only trigger when 'count' or 'userId' changes
  // Adjust dependencies if necessary

  useEffect(() => {
    console.log(dummyTask);
  }, [dummyTask]);
  //tester:)
  // useEffect(() => {
  //   if (myContext?.emptyTask == true) {
  //     console.log("true now");
  //   }
  // }, [myContext?.emptyTask]);

  const progressArr = [
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color={"#FA5252"}
      onClick={() =>
        setDummyTask((prevTask) => ({
          ...prevTask,
          status: "pending",
        }))
      }
    >
      INCOMPLETE
    </Button>,
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color={"#FAB005"}
      onClick={() =>
        setDummyTask((prevTask) => ({
          ...prevTask,
          status: "in-progress",
        }))
      }
    >
      IN-PROGRESS
    </Button>,

    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color={"#12B886"}
      key="status-badge" // Always add a key when creating components dynamically
      onClick={() =>
        setDummyTask((prevTask) => ({
          ...prevTask,
          status: "completed",
        }))
      }
    >
      COMPLETE
    </Button>,
  ];

  const filteredMembers = myContext?.teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePriorityChange = (index) => {
    const priorityLevels = ["LOW", "MEDIUM", "HIGH"];
    setPriority(priorityLevels[index]);
    setPriorityDropdownOpen(false); // Close dropdown after selection
  };

  const priorityArr = [
    <Button
      variant="filled"
      size="xs"
      className="rounded-[20px] h-[20px] flex w-full items-center justify-center"
      color="#12B886"
      leftSection={<IconFlag size="20" />}
      onClick={() => {
        setDummyTask((prevTask) => ({
          ...prevTask,
          priority: "low",
        }));
        setCount((prevCount) => {
          const newCount = [...prevCount];
          newCount[1] = true;
          return newCount;
        });
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
        setDummyTask((prevTask) => ({
          ...prevTask,
          priority: "medium",
        }));
        setCount((prevCount) => {
          const newCount = [...prevCount];
          newCount[1] = true;
          return newCount;
        });
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
        setDummyTask((prevTask) => ({
          ...prevTask,
          priority: "high",
        }));
        setCount((prevCount) => {
          const newCount = [...prevCount];
          newCount[1] = true;
          return newCount;
        });
      }}
    >
      HIGH
    </Button>,
  ];

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setMemberList(false);
    // Add logic to handle assignment to the task
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
    //setDummyTask((prevTask) => ({ ...prevTask, title: event.target.value }));
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    setDummyTask((prevTask) => ({
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
    setDummyTask((prevTask) => ({
      ...prevTask,
      content: myContent,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setDummyTask((prevTask) => ({
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
  const formatDate = (date: Date | null) => {
    if (!date) {
      return false;
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };
  const mapAssigned = () => {
    return TaskContent.assigned.map((assignee) => assignee).join(", ");
  };

  //This changes the color of the status pill based on its status
  useEffect(() => {
    if (TaskContent.status === "Incomplete") {
      setStatusColor("#FA5252");
    } else if (TaskContent.status === "in-progress") {
      setStatusColor("#FAB005");
    } else if (TaskContent.status === "Complete") {
      setStatusColor("#12B886");
    }
  }, [TaskContent.status]);

  //This changes the color of the priority pill based on the priority of the task
  useEffect(() => {
    if (TaskContent.priority === "High") {
      setPriorityColors("#FA5252");
    } else if (TaskContent.priority === "Medium") {
      setPriorityColors("#FAB005");
    } else if (TaskContent.priority === "Low") {
      setPriorityColors("#12B886");
    } else {
      setPriorityColors("#868E9633");
    }
  }, [TaskContent.priority]);

  const handleProgressChange = (index: number) => {
    // Update progress status based on the clicked index
    const newProgress =
      index === 0 ? "INCOMPLETE" : index === 1 ? "IN-PROGRESS" : "COMPLETE";
    setProgress(newProgress);
    setProgressDropdownOpen(false); // Close dropdown after selection
  };

  //This is an object array that contains the contents to be rendered for the Task Specifications
  const taskSpecifications = [
    {
      label: "Start Date",
      icon: <IconCalendar size={16} />,
      value: TaskContent.created ? (
        formatDate(TaskContent.created)
      ) : (
        <Popover>
          <Popover.Target>
            <Button
              variant="filled"
              color="#688193"
              className="h-[90%] text-[13px]"
              onClick={() => setStartCalendar(!startCalendar)}
            >
              Set Start Date
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar />
          </Popover.Dropdown>
        </Popover>
      ), // Fallback message
    },
    {
      label: "Due Date",
      icon: <IconCalendarDue size={16} />,
      value: (
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
            <Calendar />
          </Popover.Dropdown>
        </Popover>
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
              color={
                progress === "INCOMPLETE"
                  ? "#FA5252"
                  : progress === "IN-PROGRESS"
                  ? "#FAB005"
                  : progress === "COMPLETE"
                  ? "#12B886"
                  : ""
              }
              onClick={() => setProgressDropdownOpen(!progressDropdownOpen)}
            >
              {TaskContent.status || "INCOMPLETE"}
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
              color={
                priority === "LOW"
                  ? "#12B886"
                  : priority === "MEDIUM"
                  ? "#FAB005"
                  : priority === "HIGH"
                  ? "#FA5252"
                  : ""
              }
              onClick={() => setPriorityDropdownOpen(!priorityDropdownOpen)}
            >
              <IconFlag
                size="15"
                className="mr-[5px] flex items-center justify-center"
              />{" "}
              {TaskContent.priority || "N/A"}
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
                Assign Member
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Input
                placeholder="Search for a member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb="xs"
              />
              {filteredMembers.length > 0 ? (
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

  return (
    <div className="flex flex-col text-white border-red-600 w-[90%] h-full p-[24px] overflow-y-auto scrollbar-hide">
      {/*------------------------------! TASK TITLE DIV !------------------------------------*/}
      <div className="flex w-full h-max mb-4">
        {isEditingTitle ? (
          <Input
            value={taskTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            placeholder="Enter Title"
            variant="unstyled"
            className="border-red-600 flex w-full"
            styles={{
              input: {
                color: "#B7CDDE", // Text color
                "::placeholder": {
                  color: "#B7CDDE", // Placeholder text color
                },
              },
            }}
          />
        ) : (
          <div
            className="text-[#688193] w-full cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            {TaskContent.title || taskTitle}
          </div>
        )}
      </div>
      {/*------------------------------! TASK TITLE DIV !------------------------------------*/}
      {/*------------------------------! TABLE COMPONENT (TASK SPECIFICATIONS) !------------------------------------*/}
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
          {TaskContent.content.length === 0 && (
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
          )}
          {TaskContent.content}
        </div>
      </div>
      <div className="flex flex-col mt-[24px] text-[20px] w-full h-max">
        <div className="flex justify-between 2xl:w-[9%] lg:w-[13%] items-center border-red-600 text-[#B7CDDE]">
          <IconMessage />
          Comments
        </div>
        <Textarea
          placeholder="Write a comment..."
          autosize
          minRows={3}
          maxRows={6}
          className="mt-2 placeholder:[#C9C9C9]"
          variant="filled"
        />
        {TaskContent.comments.length === 0 && (
          <div className="flex w-full justify-center items-center mt-[5%]  text-[#B7CDDE]">
            {" "}
            No Comments{" "}
          </div>
        )}

        {TaskContent.comments.map((comment, index) => (
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
                      {comment.author}
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
                  <div className="flex w-[100%] justify-between mt-[8px] items-center">
                    <div className="flex w-[75%] items-center border-red justify-between">
                      <div className="flex w-full items-center">
                        <IconThumbUp
                          width="40%"
                          className="hover:cursor-pointer"
                          onClick={() => {
                            comment.likes++; // Update this to update the likes in the backend
                          }}
                        />
                        <h1 className="text-[14px] ml-[5px]">
                          {" "}
                          {comment.likes}{" "}
                        </h1>
                      </div>
                      <div className="flex w-full items-center">
                        <IconThumbDown
                          width="49%"
                          className="hover:cursor-pointer"
                          onClick={() => {
                            comment.dislikes++; // Update this to update the likes in the backend
                          }}
                        />
                        <h1 className="text-[14px] ml-[5px]">
                          {" "}
                          {comment.dislikes}{" "}
                        </h1>
                      </div>
                    </div>
                    <div className="flex hover:underline">
                      <Button
                        variant="transparent"
                        styles={{
                          root: {
                            color: "white", // Sets the initial color
                          },
                        }}
                        className="text-[12px]"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*------------------------------! TASK DESCRIPTION MAIN DIV !------------------------------------*/}
    </div>
  );
};

export default FullCard;
