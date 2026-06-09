import React, { useState, useEffect, useRef } from 'react';
// import { AVAILABLE_CITIES } from '../../data/cities';
const AVAILABLE_CITIES = ['Paris', 'Marseille', 'Lyon', 'Bordeaux', 'Nantes', 'Toulouse', 'Nice', 'Strasbourg'];

export default function CityInput({ label, value, onChange, placeholder, error, onEnter, icon, className = "" }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = AVAILABLE_CITIES.filter(city =>
      city.toLowerCase().startsWith(value.toLowerCase()) && city.toLowerCase() !== value.toLowerCase()
    );
    setSuggestions(filtered);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) onChange(suggestions[0]);
      if (onEnter) onEnter();
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {icon && <img src={icon} alt="icon" className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-10 pointer-events-none" />}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`${className} ${icon ? 'pl-14' : 'pl-4'} p-3 border rounded-xl w-full focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200'
        }`}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
          {suggestions.map((city) => (
            <li key={city} onClick={() => { onChange(city); setShowSuggestions(false); }} className="p-2 hover:bg-green-50 cursor-pointer text-gray-700">
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}