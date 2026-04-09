export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 text-balance">
          {/* Tagline goes here */}
          The Future of{" "}
          <span className="text-brand-600">AI-Powered</span>{" "}
          Solutions
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 text-balance">
          {/* Sub-tagline goes here */}
          Hijaz.ai helps businesses harness the power of artificial intelligence
          to build smarter, faster, and more impactful products.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
          >
            Get Started
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
