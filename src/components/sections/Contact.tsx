export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Ready to start your AI journey? We&apos;d love to hear from you.
        </p>
        <div className="mt-10">
          {/* Contact form or CTA goes here */}
          <a
            href="mailto:hello@hijaz.ai"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors"
          >
            hello@hijaz.ai
          </a>
        </div>
      </div>
    </section>
  );
}
