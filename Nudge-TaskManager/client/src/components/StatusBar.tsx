import TaskCard from "./TaskCard";
import { StatTask, } from ".././interfaces/interfaces";

const StatusBar = ({ TaskStat }: { TaskStat: StatTask }) => {
  return (
    <div className="w-full h-full pr-[20px]">
      <div className="relative bg-[#192228] border-t-[5.056px] border-t-[#88A7BD] p-[15.2px] rounded-xl lg:w-full lg:mr-[10px] lg:h-[60px] shadow-md">
        <div className="flex items-center">{TaskStat.status}</div>
      </div>

      <div className="max-h-[75%] overflow-y-auto w-full mt-[10px] scrollbar-hide">
        {Array.from({ length: TaskStat.tasks }, (_, index) => (
          <TaskCard key={index} TaskStat={TaskStat}/>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
