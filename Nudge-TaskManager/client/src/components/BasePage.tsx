import NudgeLogo from "../assets/Group 1.svg";
import { Input, Button, Avatar, ActionIcon } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconSearch,
  IconLogout,
  IconBell
} from "@tabler/icons-react";

const BasePage = () => {
  const teams = ["Team 1", "Team 2", "Team 3"];

  return (
    <div className="flex w-screen h-screen border-blue-600">
      <div className="flex flex-col w-[304px] h-full shadow-custom-shadow border-r p-[32px] border-r-[#4B5D6A] bg-[#1A2329]">
        <div className="flex border-blue-600 h-max w-max">
          <img src={NudgeLogo} alt="" width={152} />
        </div>
        <div className="mt-[29px] flex flex-col h-screen justify-between">
          <div className="flex flex-col">
            <Input
              placeholder="Search"
              size="xs"
              leftSection={<IconSearch size={17}></IconSearch>}
              styles={{
                input: {
                  backgroundColor: "#4B5D6A",
                  color: "white"
                   // Change this to your desired color
                },
              }}
              className="text-[#667988] mb-[29px] "
            />

            <div className="flex flex-col border-red-600 mb-[29px]">
              <h1 className="text-[#4B5D69] text-[12px]">MAIN MENU</h1>
              <Button
                variant="subtle"
                color="#667988"
                leftSection={
                  <IconLayoutDashboard
                    size="1rem"
                    stroke={1.5}
                    color="#667988"
                  />
                }
                className="flex items-center justify-start font-light"
              >
                DashBoard
              </Button>
            </div>

            <div className="flex flex-col border-red-600">
              <h1 className="text-[#4B5D69] text-[12px]">TEAMS</h1>
              {teams.map((index) => (
                <Button
                  variant="subtle"
                  color="#667988"
                  className="flex items-center justify-start"
                  leftSection={
                    <IconLayoutDashboard
                      size="1rem"
                      stroke={1.5}
                      color="#667988"
                    />
                  }
                >
                  <span className="text-[14px] font-light">{index}</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex h-max items-center justify-center border-red-600 ">
            <Button
              justify="center"
              leftSection={<IconLogout size="16px" />}
              variant="subtle"
              color="#667988"
              mt="md"
              className="h-[32px] text-[16px] font-light"
              style={{ fontSize: "14px", color: "#667988" }} // Change font size here
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#151C21] w-full flex">
        <div className="flex items-center pl-[33px] pr-[33px] justify-between shadow-custom-shadow  w-full border-b border-[#4B5D6A] h-[83px] bg-[#1A2329]">
          <div className="text-[#6C899C] text-[32px]">
            Team Name / Team Name
          </div>

          <div className="flex h-max w-max items-center ">
            <div className="flex items-center">
              <ActionIcon variant="transparent" color="gray">
                <IconBell/>
              </ActionIcon>
            </div>
            <div className="flex items-center ml-[28.4px]">
             <Avatar/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasePage;
