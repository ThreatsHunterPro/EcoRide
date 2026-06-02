export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}