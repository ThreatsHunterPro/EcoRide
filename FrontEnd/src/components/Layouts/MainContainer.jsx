export default function MainContainer({ children }) {
  return (
    <main className="flex-grow flex items-start justify-center pt-16 md:pt-24 pb-16 px-4 bg-gradient-to-br from-[#e6f5ec] to-white min-h-screen">
      <div className="w-full max-w-3xl border border-green-200 rounded-xl bg-white shadow-sm">
        {children}
      </div>
    </main>
  );
}