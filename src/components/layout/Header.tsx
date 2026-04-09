import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold text-gray-900">
            Hijaz<span className="text-brand-600">.ai</span>
          </a>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
