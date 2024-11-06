import {
  Card,
  Text,
  Badge,
  Group,
  Avatar,
  ActionIcon,
} from "@mantine/core";
import { IconX, IconMessage, IconLoader, IconCheck, IconFlag } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { StatTask } from "../interfaces/interfaces";

const TaskCard = ({ TaskStat }: { TaskStat: StatTask }) => {
  const [status, setStatus] = useState("");
  const [prio, setPrio] = useState("");

  useEffect(() => {
    if (TaskStat.status === "Incomplete") {
      setStatus("#FA5252");
    } else if (TaskStat.status === "In Progress") {
      setStatus("#FAB005");
    } else {
      setStatus("#12B886");
    }
  }, [TaskStat.status]);

  useEffect(() => {
    if(TaskStat.Content.priority === "High") {
      setPrio("#FA5252")
    } else if (TaskStat.Content.priority === "Medium") {
      setPrio("#FAB005")
    } else {
      setPrio("#12B886")
    }
  },[TaskStat.Content.priority]);

  return (
    <div className="">
      <Card radius="sm" className="w-full h-[270px] bg-[#192228] mt-[15px] p-[25.36px]">
        <Group className="justify-between flex w-full">
          <Badge style={{ backgroundColor: status }} className="flex font-normal items-center h-[23px]" leftSection={TaskStat.status === "Incomplete" && <IconX size="20" /> || TaskStat.status === "In Progress" && <IconLoader size="20" /> || TaskStat.status === "Complete" && <IconCheck size="20" />}>{TaskStat.status}</Badge>
          <Badge variant="light" style={{ backgroundColor: `${prio}16`, color: prio,  }} leftSection={<IconFlag size="15"/>} className="font-normal">{TaskStat.Content.priority}</Badge>
        </Group>

        <div className="mt-[10px] p-[2px] h-full min-w-full flex flex-col justify-between">
          <div className="flex flex-col">
            <Text
              fz="sm"
              c="dimmed"
              mt={5}
              lineClamp={3} // Limits to 2 lines and shows ellipsis if text exceeds
              className="w-full"
              style={{
                wordBreak: "break-word", // Breaks long words onto a new line if needed
                overflowWrap: "break-word" // Ensures long words wrap properly
              }}
            >
              {TaskStat.Content.content}
            </Text>
          </div>

          <div className="flex flex-col justify-center border-red-600">
            <div className="flex w-full h-max items-center justify-between">
              <div className="flex">
                {TaskStat.Content.assigned.map((name) => (
                  <Avatar variant="filled" size="30" key={name} name={name} color="initials" className="mr-[-14px]" />
                ))}
              </div>

              <div className="w-[40px] items-center justify-between flex text-white">
                <ActionIcon variant="transparent"><IconMessage color="#688193" /></ActionIcon>
                <h1 className="text-[#688193]">{TaskStat.Content.comments}</h1>
              </div>
            </div>
            <h1 className="mt-[10px] text-[14px] text-[#688193] underline">Due on: November 24, 2024</h1>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
