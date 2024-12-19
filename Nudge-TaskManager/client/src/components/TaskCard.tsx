import { Card, Text, Badge, Group } from "@mantine/core";
import { IconX, IconLoader, IconCheck, IconFlag } from "@tabler/icons-react";
import { useEffect, useState, useContext } from "react";
import { StatTask, TaskContent } from "../interfaces/interfaces";
import { ThemeContext } from "../interfaces/ThemeContext";

const TaskCard = ({ TaskStat }: { TaskStat: StatTask }) => {
  const [statusColor, setStatusColor] = useState(""); // Holds the status color for the task
  const [priorityColors, setPriorityColors] = useState<string[]>([]); // Array of colors based on task priority
  const themeContext = useContext(ThemeContext); // Access theme context for task selection and rendering logic

  // Effect to update status color based on TaskStat.status
  useEffect(() => {
    if (TaskStat.status === "Incomplete") {
      setStatusColor("#FA5252"); // Red for incomplete
    } else if (TaskStat.status === "In Progress") {
      setStatusColor("#FAB005"); // Yellow for in progress
    } else {
      setStatusColor("#12B886"); // Green for completed
    }
  }, [TaskStat.status]);

  // Effect to calculate and set priority colors for each task
  useEffect(() => {
    const colors = TaskStat.Task.map((task) => {
      if (task.priority === "high") return "#FA5252"; // Red for high priority
      if (task.priority === "medium") return "#FAB005"; // Yellow for medium priority
      if (task.priority === "low") return "#12B886"; // Green for low priority
      return "#868E9633";
    });
    setPriorityColors(colors);
  }, [TaskStat.Task]);

  // Function to handle card click events and toggle task details view
  const handleClick = (task: TaskContent) => {
    themeContext?.setSelectedTask(task); // Set the clicked task as selected in context
    themeContext?.setRenderFullTask(!themeContext.renderFullTask); // Toggle full task view rendering
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Container for the task cards */}

      {TaskStat.Task.map((task, index) => (
        <Card
          key={task.title} // Unique key for each card
          radius="sm"
          className="w-full h-max bg-[#192228] mt-[20px] p-[25.36px] hover:cursor-pointer hover:border border-[#88A7BD]"
          onClick={() => {
            //console.log(count);
            handleClick(task);
          }} // Handles logic when the card is clicked
        >
          {/* TaskCard Header: Status and Priority Badges */}
          <Group className="flex w-full justify-between">
            {/* Badge for the task status */}
            <Badge
              style={{ backgroundColor: statusColor }} // Sets badge color based on status
              className="flex font-normal items-center lg:w-[51%] 2xl:w-max h-[23px]"
              leftSection={
                TaskStat.status === "Incomplete" ? (
                  <IconX size="15" />
                ) : TaskStat.status === "In Progress" ? (
                  <IconLoader size="15" />
                ) : (
                  <IconCheck size="15" />
                )
              } // Displays appropriate icon for task status
            >
              {TaskStat.status}
            </Badge>

            {/* Badge for the task priority */}
            <Badge
              variant="light"
              style={{
                backgroundColor: `${priorityColors[index]}16`, // Light background for the priority color
                color: priorityColors[index], // Priority text color
              }}
              leftSection={<IconFlag size="15" />} // Flag icon for priority
              className="font-normal"
            >
              {task.priority}
            </Badge>
          </Group>

          {/* TaskCard Body: Title, Content, and Footer */}
          <div className="mt-[10px] p-[2px] h-full min-w-full flex flex-col justify-between">
            {/* Task Title and Content */}
            <div className="flex flex-col">
              <Text
                fz="lg"
                lineClamp={10} // Clamp to 10 lines
                color="#B7CDDE"
                className="w-full mb-[2%] h-max text-[#B7CDDE]"
              >
                {task.title} {/* Task title */}
              </Text>
              <Text
                fz="sm"
                mt={5}
                lineClamp={10} // Clamp to 10 lines
                className="w-full mb-[15%] h-max text-[#88A7BD]"
                style={{
                  wordBreak: "break-word", // Break words for long content
                  overflowWrap: "break-word", // Ensure proper wrapping
                }}
              >
                {task.content} {/* Task content */}
              </Text>
            </div>

            {/* Footer: Assigned Avatars, Comments, and Due Date */}
            <div className="flex flex-col justify-center border-red-600">
              <div className="flex w-full h-max items-center justify-between"></div>

              {/* Due Date */}
              <h1 className="mt-[10px] text-[14px] text-[#688193] underline">
                Due on: {task.due ? task.due.toLocaleDateString() : "No date"}{" "}
                {/* Formatted due date */}
              </h1>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TaskCard;
