import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, MessageSquare, Send, CheckCircle, AlertCircle, X } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [submitting, setSubmitting] = useState(false);

  const contactInfo = [
    { icon: Mail, title: "Email Us", details: "hello@velourabeauty.com", sub: "We respond within 24 hours" },
    { icon: MapPin, title: "Visit Us", details: "123 Beauty Lane, Suite 100", sub: "New York, NY 10001" },
    { icon: Phone, title: "Call Us", details: "1-800-VELOURA", sub: "Mon–Fri, 9am–6pm EST" },
    { icon: MessageSquare, title: "Live Chat", details: "Available on site", sub: "Mon–Fri, 9am–5pm EST" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  return (
    <main className="bg-[#f7f3eb] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-gray-500">Contact Us</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900 md:text-7xl leading-tight">
            Let's talk beauty.
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Have a question about our products, your order, or just want to say hi?
            We'd love to hear from you.
          </p>
        </section>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Get in Touch</h2>
              <p className="mt-3 text-gray-600">
                Choose the method that works best for you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-900">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-700">{item.details}</p>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Link */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">Quick Answers</h3>
              <p className="mt-2 text-gray-600">Check our FAQ for instant answers to common questions.</p>
              <button className="mt-4 text-sm font-medium text-black underline underline-offset-2 hover:text-gray-700">
                View FAQs →
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
              <p className="mt-2 text-gray-600">Fill out the form and we'll get back to you as soon as possible.</p>

              {status === "success" && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 animate-fade-in">
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <div>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus(null)}
                    className="ml-auto text-green-700 transition-opacity hover:opacity-75"
                    aria-label="Dismiss success message"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 animate-fade-in">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <div>
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-sm">Please try again or email us directly.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus(null)}
                    className="ml-auto text-red-700 transition-opacity hover:opacity-75"
                    aria-label="Dismiss error message"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10 placeholder:text-gray-400"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10 placeholder:text-gray-400"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order & Shipping</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="product">Product Question</option>
                    <option value="account">Account & Billing</option>
                    <option value="wholesale">Wholesale & Partnerships</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10 placeholder:text-gray-400 resize-y min-h-[140px]"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-500">
                By submitting, you agree to our <Link to="/privacy" className="underline hover:text-black">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
