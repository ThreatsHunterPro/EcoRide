import React, { useRef } from 'react';

const DateInput = ({ 
  label = "Date",
  icon, 
  placeholder, 
  className = "", 
  value, 
  min,
  onChange
}) => {
  const dateInputRef = useRef(null);

  const handleContainerClick = () => {
    if (!dateInputRef.current) return;
    
    try {
      // La méthode moderne qui ouvre directement le calendrier
      dateInputRef.current.showPicker();
    } catch (error) {
      // Fallback si showPicker n'est pas supporté (vieux navigateurs)
      dateInputRef.current.focus();
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className={`
        ${className} 
        flex items-center p-3 border rounded-xl 
        hover:bg-gray-50 transition-all cursor-pointer 
        group relative min-h-[64px]
      `}
    >
      {icon && (
        <img 
          src={icon} 
          alt="calendarIcon" 
          className="w-6 h-6 opacity-60 group-hover:opacity-70 transition-opacity flex-shrink-0" 
        />
      )}
      
      <div className="flex flex-col ml-4 flex-1">
        {value && (
          <span className="text-[10px] uppercase font-bold text-green-600">
            {label}
          </span>
        )}
        
        <div className="relative flex items-center">
          {!value && (
            <span className="text-gray-400 font-medium absolute left-0 pointer-events-none">
              {placeholder}
            </span>
          )}
          
          <input 
            ref={dateInputRef}
            type="date"
            value={value}
            min={min}
            onChange={onChange}
            className={`bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer w-full outline-none ${!value ? "opacity-0" : "opacity-100"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DateInput;