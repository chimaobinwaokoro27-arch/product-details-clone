import { Link } from "react-router-dom";
import { Globe, Users, MessageCircle, Play, Mail, Truck, Shield, RotateCcw } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?new=true" },
      { label: "Best Sellers", href: "/shop?bestseller=true" },
      { label: "Gift Sets", href: "/shop?category=gift-sets" },
      { label: "Sale", href: "/shop?sale=true" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
    company: [
      { label: "About Veloura", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    account: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/account/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Loyalty Program", href: "/loyalty" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  };

  const socialLinks = [
    { icon: Globe, href: "https://instagram.com", label: "Instagram" },
    { icon: Users, href: "https://facebook.com", label: "Facebook" },
    { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
    { icon: Play, href: "https://youtube.com", label: "YouTube" },
  ];

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: Mail, title: "24/7 Support", desc: "Dedicated customer care" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800 px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 text-center md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-[160px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                <feature.icon size={20} />
              </div>
              <div>
                <p className="font-medium text-white">{feature.title}</p>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              Veloura Beauty.
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Modern beauty for the bold. Curated skincare, makeup & fragrance.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 transition-all hover:bg-gray-700 hover:text-white"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <nav>
            <h3 className="font-semibold text-white">Shop</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav>
            <h3 className="font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account */}
          <nav>
            <h3 className="font-semibold text-white">My Account</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-2xl bg-gray-900 p-8 md:p-12">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Join the Veloura Circle
            </h3>
            <p className="mt-3 text-gray-400">
              Get early access to new launches, exclusive offers, and beauty tips.
            </p>
            <form className="mt-6 flex flex-col gap-3 md:flex-row" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-gray-700 bg-gray-800 px-5 py-3 text-sm outline-none focus:border-white focus:ring-2 focus:ring-white/20"
                required
              />
              <button
                type="submit"
                className="w-full md:w-auto rounded-full bg-white px-8 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-gray-500">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            © {currentYear} Veloura Beauty. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
