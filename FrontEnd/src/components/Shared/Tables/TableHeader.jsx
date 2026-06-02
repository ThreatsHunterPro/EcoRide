export default function TableHeader({ children, className }) {
  return (
    <th
      className={`px-4 py-2 border-b border-gray-300 text-left font-semibold ${className || ''}`}
    >
      {children}
    </th>
  );
}