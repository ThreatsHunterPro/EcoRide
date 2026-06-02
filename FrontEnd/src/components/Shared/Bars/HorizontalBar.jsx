export default function HorizontalBar({
  color = "bg-gray-200",
  thickness = "h-px",
  className = "",
}) {
  return (
    <div className={`w-full ${thickness} ${color} ${className}`} />
  )
}
