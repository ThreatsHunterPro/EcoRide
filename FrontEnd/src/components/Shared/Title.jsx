export default function Title({ children, level = 1, textColor = "text-green-700", toCenter = false }) {
  
  const aligment = toCenter ? "text-center" : "text-left";
  const baseClassName = `break-words leading-tight ${aligment}`;

  const headingMap = {
    1: { tag: "h1", className: `text-4xl font-bold ${textColor} mb-16 ${baseClassName}` },
    2: { tag: "h2", className: `text-2xl font-bold ${textColor} mb-2 ${baseClassName}` },
    3: { tag: "h3", className: `font-bold ${textColor} ${baseClassName}` },
  };

  const { tag: Tag, className } = headingMap[level] || headingMap[1];

  return <Tag className={className}>{children}</Tag>;
}