const StatusBar = ({ Status }: { Status: string }) => {
    return (
        <div className="border border-red-600 w-max h-full">
            <div className="flex border bg-[#192228] items-center p-[15.2px] rounded-xl lg:w-[260px] lg:h-[60px] 2xl:w-[364px] 2xl:h-[65px]">{Status}</div>
        </div>
    )
}

export default StatusBar