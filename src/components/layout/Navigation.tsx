const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          {link.label}
        </a>
      ))}
      <a
        href="#contact"
        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors"
      >
        Get in Touch
      </a>
    </nav>
  );
}
