export default function TabSwitcher({ activeTab, onTabChange, tabs = [] }) {
  return (
    <div className="flex justify-center mb-6 border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab.id
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500 hover:text-green-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}