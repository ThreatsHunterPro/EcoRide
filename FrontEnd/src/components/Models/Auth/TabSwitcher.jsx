//TODO Make it more modular
export default function TabSwitcher({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center mb-6 border-b border-gray-300">
      {["register", "login"].map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm font-medium capitalize ${
            activeTab === tab
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500 hover:text-green-400"
          }`}
        >
          {tab === "register" ? "Inscription" : "Connexion"}
        </button>
      ))}
    </div>
  );
}
