export default function TableRow({ selected, children }) {
  return (
    <tr
      className={`${
        selected ? 'bg-blue-100' : 'bg-white'
      } hover:bg-blue-50 transition-colors`}
    >
      {children}
    </tr>
  );
}