import {
  Button,
  Text,
  Card,
  RingProgress,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconFilter, IconArrowsSort } from "@tabler/icons-react";
import StatusBar from "../components/StatusBar";
import { StatTask } from "../interfaces/interfaces";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import classes from "../StatsRingCard.module.css";

const DashboardPage = ({ StatTask }:{ StatTask:StatTask[] }) => {

  const [selectDash, setSelectDash] = useState(false)
  const [screenSize, setScreenSize] = useState("sm");

  const stats = [
    { value: StatTask[1], label: "In Progress" },
    { value: StatTask[0], label: "Incomplete" },
  ];

  const theme = useMantineTheme();
  const completed = StatTask[2].Task.length;
  const total = StatTask[0].Task.length + StatTask[1].Task.length + StatTask[2].Task.length;
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>s</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  const [selected, setSelected] = useState<Date[]>([]);
  const handleSelect = (date: Date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 1536 ? "md" : "sm");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex p-[24px] border-red-600 h-full w-full text-white">
      <div className="flex w-[100%] border-blue-600 flex-col">
        <div className="items-center h-max justify-between border-white flex w-full">
          <Button
            leftSection={<IconPlus />}
            variant="subtle"
            color="#667988"
            className="bg-[#192228] text-[#8CAFC7]"
          >
            Add Task
          </Button>

          <div className="flex mr-[20px] items-center">
            <Button
              size="sm"
              variant="subtle"
              color="#667988"
              leftSection={<IconFilter size="15" />}
              className="font-light"
            >
              Filter
            </Button>

            <Button
              size="sm"
              variant="subtle"
              color="#667988"
              leftSection={<IconArrowsSort size="15" />}
              className="font-light"
            >
              Sort
            </Button>
          </div>
        </div>
        <div className=" border-green-600 w-full h-full flex mt-[27.65px]">
          {StatTask.map((stat: StatTask, index: number) => (
            <StatusBar key={index} TaskStat={stat} selectDash={selectDash} setSelectDash={setSelectDash}/>
          ))}
        </div>
      </div>
      <div className="w-max flex flex-col h-full">
        <Calendar
          className="bg-[#33424C] p-4 rounded-md mt-[10px] w-full"
          size={screenSize === "sm" ? "sm" : "md"}
          getDayProps={(date) => ({
            selected: selected.some((s) => dayjs(date).isSame(s, "date")),
            onClick: () => handleSelect(date),
          })}
          styles={{
            day: {
              color: "#C9C9C9", // Change default day text color
            },
          }}
        />
        <Card p="xl" radius="md" className={`${classes.card}`}>
          <div className={`${classes.inner}`}>
            <div>
              <Text fz="xl" className={`${classes.label}`}>
                Progress Overview
              </Text>
              <div>
                <Text className={classes.lead} mt={30}>
                  {StatTask[2].Task.length}
                </Text>
                <Text fz="xs" c="dimmed">
                  Completed
                </Text>
              </div>
              <Group className="text-white" mt="lg">
                {items}
              </Group>
            </div>

            <div className={classes.ring}>
              <RingProgress
                roundCaps
                thickness={6}
                size={150}
                sections={[
                  {
                    value: (completed / total) * 100,
                    color: theme.primaryColor,
                  },
                ]}
                label={
                  <div>
                    <Text ta="center" fz="lg" className={classes.label}>
                      {((completed / total) * 100).toFixed(0)}%
                    </Text>
                    <Text ta="center" fz="xs" c="dimmed">
                      Completed
                    </Text>
                  </div>
                }
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
