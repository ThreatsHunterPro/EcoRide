import { Link } from "react-router-dom";

export default function LinkText({ link, children = "" }) {

  const isMail = link.includes("@");
  const isExternal = !isMail && (link.startsWith("http://") || link.startsWith("https://"));
  const route = link.startsWith("/") ? link : `/${link}`;

  const baseClasses = "ml-1 text-lg font-bold hover:underline";
  const typeClasses = isMail ? "text-purple-900" : isExternal ? "text-blue-800" : "text-green-600";

  if (isMail) {
    return (
      <a
        href={`mailto:${link}`}
        className={`${baseClasses} ${typeClasses}`}
      >
        {link}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${typeClasses}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={route} className={`${baseClasses} ${typeClasses}`}>
      {children}
    </Link>
  );
}
