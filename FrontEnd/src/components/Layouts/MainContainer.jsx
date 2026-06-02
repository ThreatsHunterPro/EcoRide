export default function MainContainer({ children }) {
  return (
    <main className="flex-grow">
      <div className="max-w-3xl mx-auto my-16 p-8 bg-green-200 rounded-xl shadow-md">
        {children}
      </div>
    </main>
  );
}
