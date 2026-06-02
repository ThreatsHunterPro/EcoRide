import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/auth/useAuth";

import logo from "../../assets/logo.png";
import UserDropdown from "../Models/Users/UserDropdown";

export default function Header({ 
  className = "",
  children  
}) {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const [open, setOpen] = useState(false); 
  
  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className={`w-full h-24 px-8 flex items-center justify-between bg-[#F8FAF9] border-b border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] sticky top-0 z-50 ${className}`}>

      {/* Logo : Agrandi avec h-16 (64px) pour qu'il soit bien visible */}
      <div className="flex items-center">
        <Link to="/">
          <img 
            src={logo} 
            alt="EcoRide Logo"
            className="h-32 w-auto object-contain" 
          />
        </Link>
      </div>

      {/* Zone centrale */}
      <div className="flex-1 mx-8 flex justify-center">
        {children}
      </div>

      {/* Profil utilisateur / Connexion */}
      <div className="flex items-center space-x-4">
        {token ? (
          <div className="relative">
            {/* Déclencheur : Uniquement l'avatar, sans bordure ni texte */}
            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#27AE60] flex items-center justify-center bg-white shadow-sm">
                {user?.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt="Profil" 
                    className="h-full w-full object-cover"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=27AE60&color=fff`; }}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#27AE60]"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM313.6 288h-11.7c-22.2 10.3-46.9 16-73.9 16s-51.7-5.7-73.9-16h-11.7C62.8 288 0 350.8 0 429.3V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48v-34.7c0-78.5-62.8-141.3-134.4-141.3z"/>
                  </svg>
                )}
              </div>
            </button>

            {/* Overlay transparent pour fermer en cliquant ailleurs */}
            {open && (
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setOpen(false)} 
              />
            )}

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <UserDropdown 
                  user={user} 
                  handleLogout={handleLogout}
                />
              </div>
            )}
          </div>
        ) : (
          <Link 
            to="/auth" 
            className="bg-[#27AE60] hover:bg-[#219150] text-white font-semibold rounded-full px-8 py-3 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Se connecter
          </Link>
        )}
      </div>
    </header>
  );
}