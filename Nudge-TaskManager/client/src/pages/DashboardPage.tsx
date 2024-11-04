import { Button } from "@mantine/core"
import { IconPlus,IconFilter,IconArrowsSort} from "@tabler/icons-react"
import StatusBar from "../components/StatusBar"

const DashboardPage = () => {
    return (
        <div className="flex p-[19px] border-red-600 h-full w-full text-white">
            <div className="flex w-[75%] border-blue-600 flex-col">
                <div className="items-center h-max justify-between border border-white flex w-full">
                    <Button leftSection={<IconPlus />} variant="subtle"
                        color="#667988" className="bg-[#192228] text-[#8CAFC7]">Add Task</Button>

                    <div className="">
                        <Button size="sm" variant="subtle" color="#667988" leftSection={<IconFilter size="15" />} className="font-light">
                            Filter
                        </Button>

                        <Button size="sm" variant="subtle" color="#667988" leftSection={<IconArrowsSort size="15" />} className="font-light">
                            Sort
                        </Button>
                    </div>
                </div>
                <div className="border border-green-600 w-full h-full justify-between flex mt-[27.65px]">
                    <StatusBar Status="Incomplete"/>
                    <StatusBar Status="In Progress"/>
                    <StatusBar Status="Completed"/>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage