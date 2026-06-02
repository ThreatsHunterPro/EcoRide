export default function Checkbox({ checked, onChange, ariaLabel }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
  );
}