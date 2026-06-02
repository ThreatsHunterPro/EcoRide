import Title from "./Title";

export default function ListItem({ label, children, inline = true }) {

  const content = typeof children === "string" ? <span>{children}</span> : children;

  return (
    <li className={inline ? "flex gap-2 items-center" : "mb-2"}>
      <Title level={3}>{label}{" :"}</Title>
      {content}
    </li>
  );
}