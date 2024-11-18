import { Badge, Table, Avatar } from "@mantine/core";
import { TaskContent } from "../interfaces/interfaces";
import {
  IconCalendar,
  IconProgress,
  IconFlag,
  IconCalendarDue,
  IconUser,
  IconMessage,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const FullCard = ({ TaskContent }: { TaskContent: TaskContent }) => {
  const [statusColor, setStatusColor] = useState("");
  const [priorityColors, setPriorityColors] = useState("");

  //Function to format start date and due date of task
  const formatDate = (date: Date) => {
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
    } else {
      setStatusColor("#12B886");
    }
  }, [TaskContent.status]);

  //This changes the color of the priority pill based on the priority of the task
  useEffect(() => {
    if (TaskContent.priority === "High") {
      setPriorityColors("#FA5252");
    } else if (TaskContent.priority === "Medium") {
      setPriorityColors("#FAB005");
    } else {
      setPriorityColors("#12B886");
    }
  }, [TaskContent.priority]);

  //This is an object array that contains the contents to be rendered for the Task Specifications
  const taskSpecifications = [
    {
      label: "Start Date",
      icon: <IconCalendar size={16} />,
      value: formatDate(TaskContent.due),
    },
    {
      label: "Due Date",
      icon: <IconCalendarDue size={16} />,
      value: formatDate(TaskContent.due),
    },
    {
      label: "Progress",
      icon: <IconProgress size={16} />,
      value: <Badge color={statusColor}>{TaskContent.status}</Badge>,
    },
    {
      label: "Priority",
      icon: <IconFlag size={16} />,
      value: <Badge color={priorityColors}>{TaskContent.priority}</Badge>,
    },
    { label: "Assignees", icon: <IconUser size={16} />, value: mapAssigned() },
  ];

  return (
    <div className="flex flex-col text-white border-red-600 w-full h-full p-[24px] overflow-y-auto scrollbar-hide">
      {/*------------------------------! TASK TITLE DIV !------------------------------------*/}
      <div className="flex w-full h-max mb-4">
        <h1 className="text-white 2xl:text-[32px] lg:text-[24px]">
          {" "}
          {TaskContent.title}{" "}
        </h1>
      </div>
      {/*------------------------------! TASK TITLE DIV !------------------------------------*/}

      {/*------------------------------! TABLE COMPONENT (TASK SPECIFICATIONS) !------------------------------------*/}
      <Table verticalSpacing="md">
        <tbody>
          {taskSpecifications.map((spec, index) => (
            <tr key={index} className="mb-[10px] flex w-[35%] justify-between">
              <td className="flex items-center space-x-2">
                {spec.icon}
                <span className="text-white text-[16px]">{spec.label}</span>
              </td>
              <td className="text-white w-[150px] text-[16px] flex justify-center">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/*------------------------------! TABLE COMPONENT (TASK SPECIFICATIONS) !------------------------------------*/}

      {/*------------------------------! TASK DESCRIPTION MAIN DIV !------------------------------------*/}
      <div className="border-t border-b mt-[32px] flex flex-col w-full h-max pb-[2%]">
        <div className="text-[24px] pt-[2%] pb-[1.5%]">Task Description</div>

        <div
          className="h-max w-full text-[16px]"
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {" "}
          {/*TASK DESCRIPTION CONTENT DIV*/}
          {TaskContent.content}
        </div>
      </div>
      <div className="flex flex-col mt-[24px] text-[20px] w-full h-max">
        <div className="flex justify-between w-[11%] items-center border-red-600">
          <IconMessage />
          Comments
        </div>
        <div className="flex flex-col text-[16px] mt-[16px] p-[8px]">
          {/* COMMENT DIV */}
          <div className="flex items-center border-red-600 w-[13%] justify-between">
            <Avatar size="md" />
            <div className="flex flex-col">
              <h1>Victorienne tiu</h1>
              <h1 className="text-[12px] text-[#6C899C]">Time posted</h1>
            </div>
          </div>
          <div className="flex text-[14px] flex-col border-red-600 mt-[6px]">
            {/* COMMENT */}
              This is a test comment
          </div>
        </div>
      </div>
      {/*------------------------------! TASK DESCRIPTION MAIN DIV !------------------------------------*/}
    </div>
  );
};

export default FullCard;
