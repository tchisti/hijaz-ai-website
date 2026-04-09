export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            About Hijaz.ai
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {/* About description goes here */}
            We are a team of AI researchers, engineers, and designers building
            intelligent solutions that drive real business outcomes.
          </p>
        </div>
        {/* Additional about content / team / values go here */}
      </div>
    </section>
  );
}
