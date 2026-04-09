export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-white">
            Hijaz<span className="text-brand-400">.ai</span>
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hijaz.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
