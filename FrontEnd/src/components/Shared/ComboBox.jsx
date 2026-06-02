export default function ComboBox({ label, name, value, onChange, options, required }) {
  return (
    <div>
      {label && (
        <label className="block font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border rounded p-2"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
