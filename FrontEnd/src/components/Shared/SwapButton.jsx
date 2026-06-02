import switchIcon from "../../assets/switch.png";

export default function SwapButton({ onSwap }) {
  return (
    <button
      onClick={onSwap}
      type="button"
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
                 bg-white border-2 border-green-200 p-2 rounded-full 
                 hover:bg-green-50 hover:border-green-500 
                 transition-all active:scale-95 group shadow-sm"
      title="Inverser les adresses"
    >
      <img 
        src={switchIcon} 
        alt="swap" 
        className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500 ease-in-out" 
      />
    </button>
  );
}