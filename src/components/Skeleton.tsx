const Skeleton = () => {
  return (
    <div className="p-4 flex flex-col gap-6 ">
        {[...Array(4)].map((_, i) => (
        <div
            key={i}
            className="animate-pulse rounded-2xl border border-gray-200 shadow-md p-6"
        >
            <div className="h-6 w-2/3 bg-gray-300 rounded mb-4" />
            <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
        </div>
        ))}
    </div>
  )
}

export default Skeleton