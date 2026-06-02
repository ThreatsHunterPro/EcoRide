import LinkText from "./LinkText";

export default function SeeMore({ moreLink, showOnSmall = false }) {
  if (!moreLink) return null;

  const containerClasses = `${showOnSmall ? 'flex' : 'hidden sm:flex'} items-center gap-2 mt-4 sm:mt-0`;

  return (
    <div className={containerClasses} style={{ paddingRight: '1.5rem' }}>
      <LinkText text={moreLink} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L7 17M17 7h-6m6 0v6" />
      </svg>
    </div>
  );
}
