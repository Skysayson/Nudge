import {
  Card,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { StatTask } from "../interfaces/interfaces";

const TaskCard = ({ TaskStat }: {TaskStat:StatTask}) => {
  const [status, setStatus] = useState("");
 // const [prio, setPrio] = useState("");

  useEffect(() => {
    if (TaskStat.status === "Incomplete") {
      setStatus("#FA5252");
    } else if (TaskStat.status === "In Progress") {
      setStatus("#FAB005");
    } else {
      setStatus("#12B886");
    }
  }, [TaskStat.status]); // Dependency array with Status to update prio when Status changes

//   useEffect(() => {
//     if (Priority === "High") {
//       setPrio("#FA5252");
//     } else if (Priority === "Medium") {
//       setPrio("#FAB005");
//     } else {
//       setPrio("#12B886");
//     }
//   }, [Priority]);

  return (
    <div className="">
      <Card  padding="sm" radius="sm" className="h-[306px] bg-[#192228] mt-[15px]">
        <Group>
          <Badge style={{ backgroundColor: status }} className="flex items-center space-x-2 h-[30px] w-max" leftSection={<IconX size="20"/>}>{TaskStat.status}</Badge>
        </Group>

        <Text fz="lg" fw={500} mt="md">
            Title
        </Text>
        <Text fz="sm" c="dimmed" mt={5}>
          Form context management, Switch, Grid and Indicator components
          improvements, new hook and 10+ other changes
        </Text>

        <Text c="dimmed" fz="sm" mt="md">
          Tasks completed:{" "}
          <Text span fw={500} c="bright">
            23/36
          </Text>
        </Text>

        <Progress value={(23 / 36) * 100} mt={5} />

        <Group justify="space-between" mt="md">
          <ActionIcon variant="default" size="lg" radius="md">
            <IconUpload size="1.1rem" />
          </ActionIcon>
        </Group>
      </Card>
    </div>
  );
};

export default TaskCard;
