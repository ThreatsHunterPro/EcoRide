import { useState } from "react";
import Button from "./Button";

export default function FormInput({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  focusOutline = true,
  useBorder = true,
  icon,
  width = "w-full",
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const baseWidth = width || "w-full";
  const baseStyle = `${baseWidth} h-12 ${icon ? 'pl-10' : 'px-4'} pr-4 bg-white text-gray-800 placeholder-gray-500`;
  const borderStyle = useBorder ? "border" : "border-none";
  const focusStyle = focusOutline ? "focus:outline-none focus:ring-1 focus:ring-green-300" : "";

  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3 text-gray-500 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseStyle} ${borderStyle} ${focusStyle} ${className}`}
      />
      {isPassword && (
        <Button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 flex items-center"
          variant="fill"
        >
          {showPassword ? "🙈" : "👁️"}
        </Button>
      )}
    </div>
  );
}
