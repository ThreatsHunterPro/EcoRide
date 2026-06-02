export default function Dropdown({ children }) {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-50 overflow-hidden animate-slide-down">
      {children}
    </div>
  )
}