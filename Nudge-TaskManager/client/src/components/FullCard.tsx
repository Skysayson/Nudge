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
  ListItem
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

const FullCard = ({ TaskContent }: { TaskContent: TaskContent }) => {
  const [statusColor, setStatusColor] = useState("");
  const [priorityColors, setPriorityColors] = useState("");
  const [taskTitle, setTaskTitle] = useState("Enter Title");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [renderCalendar, setRenderCalendar] = useState(false);
  const [memberList, setMemberList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Sam Brown' },
    { id: 4, name: 'Emily Davis' },
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setMemberList(false);
    // Add logic to handle assignment to the task
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
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
    } else if (TaskContent.status === "In Progress") {
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

  //This is an object array that contains the contents to be rendered for the Task Specifications
  const taskSpecifications = [
    {
      label: "Start Date",
      icon: <IconCalendar size={16} />,
      value: TaskContent.created ? (
        formatDate(TaskContent.created)
      ) : (
        <Button>
          {renderCalendar && <Calendar />}
        </Button>
      ), // Fallback message
    },
    {
      label: "Due Date",
      icon: <IconCalendarDue size={16} />,
      value: (
        <Popover position="bottom" withArrow shadow="md" opened={renderCalendar} onClose={() => setRenderCalendar(false)}>
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
        <Badge color={TaskContent.status === "" ? "#E03131" : statusColor}>
          {TaskContent.status === "" ? "INCOMPLETE" : TaskContent.status}
        </Badge>
      ),
    },
    {
      label: "Priority",
      icon: <IconFlag size={16} />,
      value: (
        <Badge color={priorityColors}>
          {TaskContent.priority === "" ? "Add Priority" : TaskContent.priority}
        </Badge>
      ),
    },
    {
      label: "Assignees",
      icon: <IconUser size={16} />,
      value: mapAssigned() === "" ? (
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
                {filteredMembers.map(member => (
                  <ListItem
                    key={member.id}
                    onClick={() => handleSelectMember(member)}
                    style={{ cursor: 'pointer', padding: '5px 10px' }}
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
            {taskTitle}
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
                placeholder="Enter a task description..."
                variant="unstyled"
                autosize
                styles={{
                  input: {
                    color: "#C9C9C9",
                  },
                }}
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
        {TaskContent.comments.length === 0 && (
          <div className="flex w-full justify-center items-center">
            {" "}
            No Comments{" "}
          </div>
        )}
        <Textarea
          placeholder="Write a comment..."
          autosize
          minRows={3}
          maxRows={6}
          className="mt-2 placeholder:[#C9C9C9]"
          variant="filled"
        />
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
