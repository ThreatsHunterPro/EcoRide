import { BriefcaseIcon } from "react-icons/fa";

export default function WireframeComponent() {
  return (
    <div
      className="absolute"
      style={{
        width: 32,
        height: 26,
      }}
    >
      <div className="relative w-full h-full">
        {/* Icon */}
        <div
          className="absolute"
          style={{ left: 8, top: 0, width: 16, height: 16 }}
        >
          <BriefcaseIcon className="w-4 h-4" />
        </div>

        {/* LineOfText */}
        <div
          className="absolute text-xs overflow-hidden whitespace-nowrap"
          style={{ left: 0, top: 16, width: 32, height: 10 }}
          title="Line of Text"
        >
          Line of Text
        </div>
      </div>
    </div>
  );
}
