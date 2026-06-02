import FormInput from "./FormInput";

export default function IconInput({ 
  icon, 
  name, 
  placeholder, 
  value, 
  onChange, 
  className = "", 
  ...props 
}) {
  return (
    <div className="relative w-full">
      <img 
        src={icon} 
        alt={`${name} icon`} 
        className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-10 pointer-events-none" 
      />
      <FormInput
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        useBorder={true}
        {...props}
        className={`${className} w-full pl-14`} 
      />
    </div>
  );
}