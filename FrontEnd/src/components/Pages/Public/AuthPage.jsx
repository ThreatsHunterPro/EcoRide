import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "../../../assets/logo.png";
import TabSwitcher from "../../Models/Auth/TabSwitcher";
import SignupForm from "../../Models/Auth/SignupForm";
import LoginForm from "../../Models/Auth/LoginForm";
import Button from "../../../components/Shared/Button";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handlePrev = () => {
    console.debug("test");
    navigate("/");
  };

  const handleTabChange = (tab) => {
    if (tab !== activeTab){
      setError(null);
    }
    setActiveTab(tab);
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-800">
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className="bg-white rounded-xl shadow-lg p-12 w-full max-w-md transform scale-110"
          style={{ minHeight: "440px" }}
        >
          <Button
            type="button"
            onClick={handlePrev}
            label="← Retour"
            variant="text"
            className="absolute top-2 left-0 text-base"
          />
          <div className="flex flex-col items-center gap-2 mt-[-48px] mb-4">
            <img
              src={logo}
              alt="Logo"
              className="w-36 h-36 object-contain"
            />
            <div className="mt-[-32px] scale-110 text-xl">
              <TabSwitcher 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center font-semibold">
              {error}
            </div>
          )}

          <div className="scale-[0.9] origin-top">
            {activeTab === "register" 
              ? <SignupForm setError={setError} /> 
              : <LoginForm setError={setError} />}
          </div>
        </div>
      </div>
    </div>
  );
}