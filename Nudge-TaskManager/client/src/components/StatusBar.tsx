import TaskCard from "./TaskCard";
import { StatTask } from "../interfaces/interfaces";

type StatusBarProps = {
  TaskStat: StatTask;
  selectDash: boolean;
  setSelectDash: (value: boolean) => void;
};

const StatusBar = ({ TaskStat }: StatusBarProps) => {
  return (
    <div className="w-full h-full pr-[20px]">
      {/* ----------------------------! STATUS HEADER DIV !---------------------------- */}
      {/* Displays the status of the task group (e.g., "Incomplete", "In Progress") */}
      <div className="relative bg-[#192228] border-t-[5.056px] border-t-[#88A7BD] p-[15.2px] rounded-xl lg:w-full lg:mr-[10px] lg:h-[60px] shadow-md">
        <div className="flex items-center text-[#B7CDDE]">
          {/* Text showing the task status */}
          {TaskStat.status}
        </div>
      </div>
      {/* ----------------------------! STATUS HEADER DIV !---------------------------- */}

      {/* ----------------------------! TASK LIST DIV !---------------------------- */}
      {/* Scrollable container holding individual TaskCards for each task in the task group */}
      <div className="max-h-[75%] 2xl:max-h-[80%] overflow-y-auto w-full mt-[10px] scrollbar-hide">
        {Array.from({ length: 1 }, (_, index) => (
          <TaskCard
            key={index} // Unique key for each task card
            TaskStat={TaskStat} // Pass the task group data to each TaskCard
          />
        ))}
      </div>
      {/* ----------------------------! TASK LIST DIV !---------------------------- */}
    </div>
  );
};

export default StatusBar;
