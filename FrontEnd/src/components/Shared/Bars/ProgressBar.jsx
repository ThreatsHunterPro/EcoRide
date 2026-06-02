export default function ProgressBar({ 
  progress, 
  hasFinished, 
  height = "h-1.5",
  width = "w-full"
}) {
  const progressColor = hasFinished ? "bg-green-500" : "bg-green-300";

  return (
    <div className="mt-2 flex justify-center">
      <div className={`${width} ${height} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full transition-all duration-300 ${progressColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
