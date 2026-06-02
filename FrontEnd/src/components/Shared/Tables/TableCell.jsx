export default function TableCell({ children, className }) {
  return (
    <td className={`px-4 py-2 border-b border-gray-200 ${className || ''}`}>
      {children}
    </td>
  );
}