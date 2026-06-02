export default function Button({
  type = "button",
  label,
  ariaLabel,
  onClick,
  className = "",
  variant = "default",
  fullWidth = false,
  centered = false,
  disabled = false,
  children,
}) {
  const variantStyles = {
    default: "bg-green-500 hover:bg-green-600 text-white",
    text: "bg-transparent text-green-500 hover:underline",
    outlined: `
        bg-transparent 
        border border-green-500 
        text-green-500 
        hover:bg-green-500 hover:text-white
      `,
  };

  const baseClasses = [
    "text-lg py-2 px-8 rounded transition",
    fullWidth ? "w-full max-w-xs" : "w-auto",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

 //TODO make a shared component with it
  const Wrapper = ({ children }) =>
    centered ? <div className="flex justify-center">{children}</div> : <>{children}</>;

  return (
    <Wrapper>
      <button
        type={type}
        aria-label={ariaLabel || label}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={baseClasses}
      >
        {children || label}
      </button>
    </Wrapper>
  );
}
