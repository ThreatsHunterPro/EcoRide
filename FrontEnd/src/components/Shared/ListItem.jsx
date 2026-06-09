import Title from "./Title";

export default function ListItem({ label, children, inline = true }) {

  const content = typeof children === "string" ? <span>{children}</span> : children;

  return (
    <li className={inline ? "flex gap-2 items-start" : "mb-2"}>
      
      <div className="shrink-0 whitespace-nowrap">
        <Title level={3}>{label}&nbsp;:</Title>
      </div>

      <div className="flex-1">
        {content}
      </div>
    </li>
  );
}