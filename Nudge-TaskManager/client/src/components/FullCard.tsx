import { Badge, Table } from "@mantine/core";
import { TaskContent } from "../interfaces/interfaces";
import { IconCalendar, IconProgress, IconFlag, IconCalendarDue, IconUser } from "@tabler/icons-react";

const FullCard = ({ TaskContent }: { TaskContent: TaskContent }) => {
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date));
  };
  const mapAssigned = () => {
    return TaskContent.assigned.map((assignee) => assignee).join(", ");
  };
  
  const taskSpecifications = [
    { label: "Start Date", icon: <IconCalendar size={16} />, value: formatDate(TaskContent.due) },
    { label: "Due Date", icon: <IconCalendarDue size={16} />, value: formatDate(TaskContent.due) },
    { label: "Progress", icon: <IconProgress size={16} />, value: <Badge color="yellow">{TaskContent.status}</Badge> },
    { label: "Priority", icon: <IconFlag size={16} />, value: <Badge color="dark">{TaskContent.priority}</Badge> },
    { label: "Assignees", icon: <IconUser size={16} />, value: mapAssigned() },
  ];

  return (
    <div className="flex flex-col text-white border-red-600 w-full h-full p-[24px]">
      <div className="flex w-full h-max mb-4">
        <h1 className="text-white 2xl:text-[32px] lg:text-[24px]"> {TaskContent.title} </h1>
      </div>

      <Table verticalSpacing="md">
        <tbody>
          {taskSpecifications.map((spec, index) => (
            <tr key={index} className="mb-[10px] border flex w-[60%]">
              <td className="flex items-center space-x-2">
                {spec.icon}
                <span className="text-white text-[16px] ">{spec.label}</span>
              </td>
              <td className="text-white text-[16px] flex items-center ml-[200px]">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FullCard;
