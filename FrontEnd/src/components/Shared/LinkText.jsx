import { Link } from "react-router-dom";

export default function LinkText({ link, children = "", className = "" }) {

  const isMail = link?.includes("@");
  const isExternal = !isMail && (link?.startsWith("http://") || link?.startsWith("https://"));
  const route = link?.startsWith("/") ? link : `/${link}`;

  const baseClasses = "font-bold hover:underline transition-colors";
  
  const typeClasses = isMail 
    ? "text-gray-900 hover:text-[#1a8a3c]" 
    : isExternal 
      ? "text-blue-800" 
      : "text-green-600";

  const finalClasses = `${baseClasses} ${typeClasses} ${className}`.trim();

  if (isMail) {
    return (
      <a href={`mailto:${link}`} className={finalClasses}>
        {children || link}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClasses}
      >
        {children || link}
      </a>
    );
  }

  return (
    <Link to={route} className={finalClasses}>
      {children || link}
    </Link>
  );
}