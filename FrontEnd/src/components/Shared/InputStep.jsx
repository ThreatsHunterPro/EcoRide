import ComboBox from "./ComboBox";

export default function InputStep({ step, data, onChange }) {
  if (!step || !step.fields) return <div>Aucune étape trouvée</div>;

  const renderField = (field) => {
  const value = data[field.name] ?? "";
  const placeholder = field.placeholder ?? "";

  if (field.type === "combobox") {
    return (
      <ComboBox
        label={field.label}
        name={field.name}
        value={value}
        placeholder={placeholder}
        onChange={(val) => onChange(field.name, val)}
        options={field.options || []}
        required={field.required}
      />
    );
  }
  
  return (
    <>
      <label className="block font-medium mb-1">
        {field.label}{field.required && '*'}
      </label>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(field.name, e.target.value)}
          className="w-full border rounded p-2"
        />
      ) : field.type === "select" ? (
        <select
          value={value}
          onChange={e => onChange(field.name, e.target.value)}
          className="w-full border rounded p-2"
        >
          {field.options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <input
          type="checkbox"
          checked={!!value}
          onChange={e => onChange(field.name, e.target.checked)}
        />
      ) : (
        <input
          type={field.type || "text"}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(field.name, e.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-1 focus:ring-green-300"
        />
      )}
    </>
  );
};


  const fieldsToRender = [];
  let inlineGroup = [];

  step.fields.forEach((field, index) => {
    if (field.inline) {
      inlineGroup.push(field);
    } else {
      if (inlineGroup.length > 0) {
        fieldsToRender.push(
          <div key={"inline-" + index} className="flex gap-4">
            {inlineGroup.map(f => (
              <div key={f.name} className="flex-1">{renderField(f)}</div>
            ))}
          </div>
        );
        inlineGroup = [];
      }
      fieldsToRender.push(
        <div key={field.name}>{renderField(field)}</div>
      );
    }
  });

  if (inlineGroup.length > 0) {
    fieldsToRender.push(
      <div key="inline-last" className="flex gap-4">
        {inlineGroup.map(f => (
          <div key={f.name} className="flex-1">{renderField(f)}</div>
        ))}
      </div>
    );
  }

  return <div className="space-y-4">{fieldsToRender}</div>;
}
