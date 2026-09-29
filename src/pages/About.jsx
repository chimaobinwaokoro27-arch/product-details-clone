import { Link } from "react-router-dom";
import { Sparkles, Award, Shield, Heart, Truck, RotateCcw } from "lucide-react";

function About() {
  const values = [
    { icon: Sparkles, title: "Clean Beauty", desc: "Every product is free from parabens, sulfates, phthalates, and 2,700+ other questionable ingredients." },
    { icon: Award, title: "Cruelty-Free", desc: "Leaping Bunny certified. We never test on animals, and we never will." },
    { icon: Shield, title: "Dermatologist Tested", desc: "Formulated with experts to ensure safety and efficacy for all skin types." },
    { icon: Heart, title: "Sustainable Packaging", desc: "Recyclable, refillable, and made with post-consumer recycled materials." },
    { icon: Truck, title: "Carbon Neutral Shipping", desc: "We offset 100% of carbon emissions from every order shipped." },
    { icon: RotateCcw, title: "Give Back Program", desc: "1% of every purchase supports women's health initiatives worldwide." },
  ];

  return (
    <main className="bg-[#f7f3eb] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="mb-24 max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-gray-500">Our Story</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900 md:text-7xl leading-tight">
            Beauty made to stand out.
          </h1>
          <div className="mt-10 max-w-2xl">
            <p className="text-lg leading-relaxed text-gray-600">
              Veloura Beauty was born from a simple belief: beauty should be clean, conscious, and accessible to everyone.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Founded in 2019 by a team of beauty industry veterans and cosmetic chemists, we set out to create a beauty destination where every product meets the highest standards of safety, performance, and sustainability — without the luxury markup.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Today, Veloura Beauty serves millions of customers worldwide, but our mission remains the same: to help you feel confident in your skin, with products you can trust.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-24 rounded-3xl bg-white p-8 md:p-16">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">Our Mission</p>
              <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
                Empowering beauty<br />without compromise.
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                We believe you shouldn't have to choose between products that work and products that are safe. Every Veloura formula is rigorously tested, transparently labeled, and crafted with ingredients that respect both your skin and the planet.
              </p>
              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:scale-[1.02]"
              >
                Shop the Collection
                <span>→</span>
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-pink-100 via-rose-50 to-white" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-widest text-gray-500">Our Promise</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Six Pillars of Veloura
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 text-gray-900 group-hover:bg-black group-hover:text-white transition-colors">
                  <value.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team / CTA */}
        <section className="rounded-3xl bg-gray-900 p-8 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Join the Veloura Community
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-300">
            Be the first to know about new launches, exclusive offers, and beauty tips from our experts.
          </p>
          <form className="mt-8 flex flex-col gap-3 md:flex-row md:max-w-md md:mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="about-email" className="sr-only">Email address</label>
            <input
              id="about-email"
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
        </section>
      </div>
    </main>
  );
}

export default About;
