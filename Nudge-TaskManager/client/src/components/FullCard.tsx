import { TaskContent } from "../interfaces/interfaces"

const FullCard = ({ TaskContent }: { TaskContent:TaskContent  }) => {
  return (
    <div className="flex text-white border border-red-600 w-full h-full justify-start">
      <h1 className="text-white"> {TaskContent.title} </h1>
    </div>
  )
}

export default FullCard