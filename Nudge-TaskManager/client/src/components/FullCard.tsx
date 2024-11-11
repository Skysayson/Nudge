import { StatTask } from "../interfaces/interfaces"

const FullCard = ({TaskStat}:{TaskStat:StatTask}) => {
  return (
    <div className="flex text-white border border-red-600 w-full h-full justify-start">
      <h1 className="text-white"> {TaskStat.status} </h1>
    </div>
  )
}

export default FullCard