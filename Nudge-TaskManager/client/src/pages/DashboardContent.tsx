// ...existing code...
import {
  Button,
  Text,
  Card,
  RingProgress,
  Group,
  useMantineTheme,
  Select,
  Avatar,
  Modal,
  Input,
  Stack,
} from "@mantine/core";
import { IconPlus, IconArrowsSort } from "@tabler/icons-react";
import StatusBar from "../components/StatusBar";
import { StatTask } from "../interfaces/interfaces";
import { useState, useContext, useMemo } from "react";
import classes from "../StatsRingCard.module.css";
import { ThemeContext } from "../interfaces/ThemeContext";
import axios from "axios";
import { API_BASE } from "../lib/api";

// Main Dashboard Page Component
const DashboardPage = ({ StatTask }: { StatTask: StatTask[] }) => {
  // Click on sort
  const [clickSort, setClickSort] = useState(false);

  // State to manage dashboard visibility
  const [selectDash, setSelectDash] = useState(false);

  // State to track current screen size for responsive design
  // const [screenSize, setScreenSize] = useState("sm");

  const { incompleteCount, inProgressCount, completedCount, total } =
    useMemo(() => {
      const incomplete = StatTask?.[0]?.Task?.length ?? 0;
      const inProgress = StatTask?.[1]?.Task?.length ?? 0;
      const completed = StatTask?.[2]?.Task?.length ?? 0;
      return {
        incompleteCount: incomplete,
        inProgressCount: inProgress,
        completedCount: completed,
        total: incomplete + inProgress + completed,
      };
    }, [StatTask]);

  // Extract statistics for in-progress and incomplete tasks
  const stats = useMemo(
    () => [
      { value: completedCount, label: "Completed" },
      { value: inProgressCount, label: "In Progress" },
      { value: incompleteCount, label: "Incomplete" },
    ],
    [inProgressCount, incompleteCount, completedCount]
  );

  const themeContext = useContext(ThemeContext); // Access theme context for task selection and rendering logic

  // Mantine theme for accessing primary colors
  const theme = useMantineTheme();

  // Calculate completed and total tasks for progress ring
  const completed = StatTask[2].Task.length;

  // Generate items for task statistics display
  const items = useMemo(
    () =>
      stats.map((stat) => (
        <div key={stat.label}>
          <Text className={classes?.label}>{stat.value}</Text>
          <Text size="xs" c="dimmed">
            {stat.label}
          </Text>
        </div>
      )),
    [stats]
  );

  // --- Members UI & Add Member ---
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newMemberId, setNewMemberId] = useState<string>("");
  const [newMemberName, setNewMemberName] = useState<string>("");
  const [addingMember, setAddingMember] = useState(false);

  const fetchMembers = async (teamId?: number) => {
    const id = teamId ?? themeContext?.numericalState;
    if (!id) return;
    try {
      const res = await axios.get(
        `http://${API_BASE}:3000/api/team/find/members/${id}`
      );
      if (Array.isArray(res.data)) {
        // Map to the TeamMember shape used in ThemeContext (id, name)
        interface MemberApiResponse {
          user_id?: number;
          username?: string;
          User?: {
            user_id?: number;
            username?: string;
          };
        }
        const mapped = (res.data as MemberApiResponse[])
          .map((m) => {
            const id =
              m.user_id !== undefined
                ? m.user_id
                : m.User?.user_id !== undefined
                ? m.User.user_id
                : undefined;
            if (typeof id !== "number") return null;
            return {
              id,
              name: m.username ?? m.User?.username ?? m.username ?? String(id),
            };
          })
          .filter((m): m is { id: number; name: string } => m !== null);
        themeContext?.setTeamMembers(mapped);
      } else {
        themeContext?.setTeamMembers([]);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const handleAddMember = async () => {
    const teamId = themeContext?.numericalState;
    if (!teamId) {
      alert("Select a team first.");
      return;
    }
    if (!newMemberId.trim() || !newMemberName.trim()) {
      alert("Provide member id and name.");
      return;
    }

    setAddingMember(true);
    try {
      await axios.post(
        `http://${API_BASE}:3000/api/member/create`,
        {
          user_id: Number(newMemberId),
          team_id: teamId,
          username: newMemberName.trim(),
          role: "member",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      // refresh members
      await fetchMembers(teamId);
      setNewMemberId("");
      setNewMemberName("");
      setAddModalOpen(false);
    } catch (err) {
      console.error("Error adding member:", err);
      alert("Failed to add member. Check console for details.");
    } finally {
      setAddingMember(false);
    }
  };

  // keep members in sync when team changes
  useMemo(() => {
    if (themeContext?.numericalState) fetchMembers(themeContext.numericalState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeContext?.numericalState]);

  return (
    <div className="flex p-[24px] border-red-600 h-full max-sm:w-[1000px] w-full text-white overflow-x-auto overflow-y-hidden">
      {/* Main Dashboard Section */}
      <div className="flex w-[100%] flex-nowrap border-blue-600 flex-col h-full">
        {/* Header Section */}
        <div className="items-center h-max justify-between border-white flex max-sm:w-[970px]">
          {/* Add Task Button */}
          {themeContext?.numericalState != 0 && (
            <Button
              leftSection={<IconPlus />}
              variant="subtle"
              color="#667988"
              className="bg-[#192228] text-[#8CAFC7]"
              onClick={() => {
                themeContext?.setEmptyTask(!themeContext.emptyTask);
                console.log(themeContext?.emptyTask);
              }}
            >
              Add Task
            </Button>
          )}

          {/* Filter and Sort Buttons */}
          <div className="flex mr-[20px] items-center">
            {themeContext?.numericalState != 0 && (
              <div className="flex relative">
                <Button
                  size="sm"
                  variant="subtle"
                  color="#667988"
                  leftSection={<IconArrowsSort size="15" />}
                  className="font-light"
                  onClick={() => setClickSort(!clickSort)}
                >
                  Sort
                </Button>
                {clickSort && (
                  <div className="absolute mt-[35px] left-[-124px] bg-[#192228] rounded-md shadow-lg p-2 w-[200px] z-10">
                    {/* Sort Dropdown */}
                    <Select
                      placeholder="Sort"
                      variant="outline"
                      data={[
                        { value: "High to Low", label: "High to Low Priority" },
                        { value: "Low to High", label: "Low to High Priority" },
                        { value: "Due Date", label: "By Due Date" },
                      ]}
                      value={themeContext?.sort ?? "Low to High"} // Default to "Low to High" if null
                      onChange={(value) =>
                        themeContext?.setSort(value as string)
                      }
                      size="sm"
                      styles={{ input: { color: "#8CAFC7" } }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Status Bars for Tasks */}
        <div className="border-green-600 w-full h-full flex mt-[27.65px]">
          {StatTask[0].Task.length > 0 ||
          StatTask[1].Task.length > 0 ||
          StatTask[2].Task.length > 0 ? (
            <div className="border-green-600 w-full h-full flex mt-[27.65px]">
              {StatTask.map((stat: StatTask, index: number) => (
                <StatusBar
                  key={index}
                  TaskStat={stat}
                  selectDash={selectDash}
                  setSelectDash={setSelectDash}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {themeContext?.numericalState != 0 ? (
                <p className="text-center text-[#B7CDDE] text-xl text-gray font-normal opacity-50">
                  No tasks available for the selected team.
                </p>
              ) : (
                <p className="text-center text-[#B7CDDE] text-xl text-gray font-normal opacity-50">
                  No teams available
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-max flex flex-col h-full max-lg:hidden">
        {/* Progress Overview Section */}
        {themeContext?.numericalState != 0 && (
          <Card p="xl" radius="md" className={`${classes.card}`}>
            <div className={`${classes.inner}`}>
              <div>
                <Text fz="xl" className={`${classes.label}`}>
                  Progress Tracker
                </Text>
                <div></div>
                {/* Task Statistics Items */}
                <Group className="text-white" mt="lg">
                  {items}
                </Group>
              </div>

              {/* Ring Progress Indicator */}
              <div className={classes.ring}>
                <div className="flex flex-col items-center">
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
                      <Text ta="center" fz="lg" className={classes.label}>
                        {((completed / total) * 100).toFixed(0)}%
                      </Text>
                    }
                  />
                  <Text ta="center" fz="md" c="dimmed" mt="sm">
                    {Number(((completed / total) * 100).toFixed(0)) === 100
                      ? "Done for the day! 🎉"
                      : Number(((completed / total) * 100).toFixed(0)) < 50
                      ? "Keep going!"
                      : "Almost There!"}
                  </Text>

                  {/* NEW: Team Members Section */}
                </div>
              </div>
            </div>
          </Card>
        )}
        <div className="w-full mt-4">
          <div className="flex items-center justify-between mb-2">
            <Text fz="sm" className="text-[#C9D6DF]">
              Team Members
            </Text>
            <Button
              size="xs"
              variant="light"
              onClick={() => setAddModalOpen(true)}
            >
              Add Member
            </Button>
          </div>

          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {themeContext?.teamMembers &&
            themeContext.teamMembers.length > 0 ? (
              themeContext.teamMembers.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-start gap-3 p-2 rounded-md hover:bg-[#122022]"
                >
                  <Avatar radius="xl" size={28}>
                    {m.name ? m.name.charAt(0).toUpperCase() : "?"}
                  </Avatar>
                  <div>
                    <Text fz="sm">{m.name}</Text>
                    <Text fz="xs" c="dimmed">
                      ID: {m.id}
                    </Text>
                  </div>
                </div>
              ))
            ) : (
              <Text size="sm" c="dimmed">
                No members in this team.
              </Text>
            )}
          </div>
        </div>
      </div>

      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Team Member"
        centered
      >
        <Stack>
          <Input
            placeholder="Member user id (numeric)"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.currentTarget.value)}
          />
          <Input
            placeholder="Member name"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.currentTarget.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="default" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember} loading={addingMember}>
              Add
            </Button>
          </div>
        </Stack>
      </Modal>
    </div>
  );
};

export default DashboardPage;
// ...existing code...
