import { Card, Text, Badge, Group, Avatar, ActionIcon } from "@mantine/core";
import {
  IconX,
  IconMessage,
  IconLoader,
  IconCheck,
  IconFlag,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { StatTask } from "../interfaces/interfaces";
import FullCard from "./FullCard";

type TaskCardProps = {
  TaskStat: StatTask;
  selectDash: boolean;
  setSelectDash: (value: boolean) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ TaskStat, setSelectDash }) => {
  const [statusColor, setStatusColor] = useState("");
  const [priorityColors, setPriorityColors] = useState<string[]>([]);
  const [renderFullTask, setRenderFullTask] = useState(false);

  // Set color based on TaskStat.status
  useEffect(() => {
    if (TaskStat.status === "Incomplete") {
      setStatusColor("#FA5252");
    } else if (TaskStat.status === "In Progress") {
      setStatusColor("#FAB005");
    } else {
      setStatusColor("#12B886");
    }
  }, [TaskStat.status]);

  // Set color for each task based on priority
  useEffect(() => {
    const colors = TaskStat.Task.map((task) => {
      if (task.priority === "High") return "#FA5252";
      if (task.priority === "Medium") return "#FAB005";
      return "#12B886";
    });
    setPriorityColors(colors);
  }, [TaskStat.Task]);

  const handleClick = () => {
    // Toggle the FullCard visibility
    setRenderFullTask(!renderFullTask);
    // Hide the dashboard
    setSelectDash(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {TaskStat.Task.map((task, index) => (
        <Card
          key={task.title}
          radius="sm"
          className="w-full h-[270px] bg-[#192228] mt-[15px] p-[25.36px] hover:cursor-pointer hover:border"
          onClick={handleClick} // Only this onClick should handle the logic
        >
          <Group className="flex w-full justify-between">
            <Badge
              style={{ backgroundColor: statusColor }}
              className="flex font-normal items-center lg:w-[51%] 2xl:w-max h-[23px]"
              leftSection={
                TaskStat.status === "Incomplete" ? (
                  <IconX size="15" />
                ) : TaskStat.status === "In Progress" ? (
                  <IconLoader size="15" />
                ) : (
                  <IconCheck size="15" />
                )
              }
            >
              {TaskStat.status}
            </Badge>
            <Badge
              variant="light"
              style={{
                backgroundColor: `${priorityColors[index]}16`,
                color: priorityColors[index],
              }}
              leftSection={<IconFlag size="15" />}
              className="font-normal"
            >
              {task.priority}
            </Badge>
          </Group>

          <div className="mt-[10px] p-[2px] h-full min-w-full flex flex-col justify-between">
            <div className="flex flex-col">
              <Text
                fz="sm"
                c="dimmed"
                mt={5}
                lineClamp={3}
                className="w-full"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {task.content}
              </Text>
            </div>

            <div className="flex flex-col justify-center border-red-600">
              <div className="flex w-full h-max items-center justify-between">
                <div className="flex">
                  {task.assigned && task.assigned.length > 0 ? (
                    task.assigned.map((name, nameIndex) => (
                      <Avatar
                        key={nameIndex}
                        variant="filled"
                        name={name}
                        size="30"
                        color="initials"
                        className="mr-[-14px]"
                      ></Avatar>
                    ))
                  ) : (
                    <span className="text-[#688193] text-[80%]">
                      No one assigned
                    </span>
                  )}
                </div>

                <div className="w-[40px] items-center justify-between flex text-white">
                  <ActionIcon variant="transparent">
                    <IconMessage color="#688193" />
                  </ActionIcon>
                  <h1 className="text-[#688193]">{task.comments}</h1>
                </div>
              </div>
              <h1 className="mt-[10px] text-[14px] text-[#688193] underline">
                Due on: {task.due.toLocaleDateString()}{" "}
              </h1>
            </div>
          </div>
        </Card>
      ))}
      {renderFullTask && <FullCard />}
    </div>
  );
};

export default TaskCard;
