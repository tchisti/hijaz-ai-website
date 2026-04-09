const services = [
  {
    title: "AI Consulting",
    description: "Strategic guidance on integrating AI into your business workflows.",
  },
  {
    title: "Custom Model Development",
    description: "Tailored machine learning models trained on your domain data.",
  },
  {
    title: "AI Product Engineering",
    description: "End-to-end development of AI-powered products and platforms.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What We Do
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Services tailored to accelerate your AI journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-3 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
