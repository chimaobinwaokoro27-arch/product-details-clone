import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, TrendingUp, Award, Gift, Shield, RotateCcw } from "lucide-react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=20"
        );

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  // Categorize products for different sections
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 12);
  const bestSellers = products.slice(12, 16);

  const categories = [
    { name: "Skincare", slug: "skincare", icon: Sparkles, count: "120+", gradient: "from-pink-100 to-rose-100" },
    { name: "Makeup", slug: "makeup", icon: Award, count: "85+", gradient: "from-amber-100 to-orange-100" },
    { name: "Fragrance", slug: "fragrance", icon: Gift, count: "45+", gradient: "from-violet-100 to-purple-100" },
    { name: "Hair Care", slug: "hair-care", icon: TrendingUp, count: "60+", gradient: "from-emerald-100 to-teal-100" },
  ];

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3eb]">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-[#f7f3eb]">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500">
              New Collection — Spring 2026
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 md:text-7xl md:leading-[1.0]">
              Beauty that speaks
              <br />
              <span className="text-black">volumes.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Discover curated beauty essentials designed to enhance your natural radiance.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
              <Link
                to="/shop"
                className="w-full max-w-xs rounded-full bg-black px-8 py-4 text-center text-sm font-medium text-white transition-all hover:bg-gray-800 hover:scale-[1.02]"
              >
                Shop New Arrivals
              </Link>
              <Link
                to="/about"
                className="w-full max-w-xs rounded-full border border-gray-300 bg-white px-8 py-4 text-center text-sm font-medium text-gray-700 transition-all hover:border-black hover:text-gray-900 hover:bg-gray-50"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 relative overflow-hidden rounded-3xl">
          {products[0] && (
            <img
              src={products[0].thumbnail}
              alt={products[0].title}
              className="w-full h-[400px] md:h-[500px] object-cover transition-opacity duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
            <Link
              to={`/product/${products[0]?.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:bg-white hover:scale-[1.02]"
            >
              Shop {products[0]?.category?.replace(/-/g, " ")}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-widest text-gray-500">Shop by Category</p>
            <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Explore Our World
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Curated collections for every beauty need
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-all duration-500 group-hover:opacity-80`} />
                <div className="relative flex h-48 md:h-56 flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all group-hover:scale-110">
                    <category.icon size={28} className="text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{category.count} products</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Featured</p>
                <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
                  Editor's Picks
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-black md:inline-flex"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="px-4 py-16 md:px-8 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">New Arrivals</p>
                <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
                  Just Landed
                </h2>
              </div>
              <Link
                to="/shop?new=true"
                className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-black md:inline-flex"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Trending</p>
                <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
                  Best Sellers
                </h2>
              </div>
              <Link
                to="/shop?bestseller=true"
                className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-black md:inline-flex"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promotional / Brand Values */}
      <section className="px-4 py-16 md:px-8 md:py-24 bg-gray-950">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-widest text-gray-400">Why Veloura?</p>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Beauty with Purpose
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              We believe beauty should be clean, conscious, and accessible to all.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Clean Formulas", desc: "Free from parabens, sulfates, and harmful chemicals. Dermatologist tested." },
              { icon: RotateCcw, title: "Sustainable Packaging", desc: "Recyclable, refillable, and made with post-consumer materials." },
              { icon: Award, title: "Cruelty-Free", desc: "Never tested on animals. Leaping Bunny certified since day one." },
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gray-900 p-8 md:p-16 text-center">
            <div className="mx-auto max-w-xl">
              <p className="text-xs uppercase tracking-widest text-gray-400">Stay Connected</p>
              <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                Get the Glow Down
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Subscribe for early access, exclusive offers, and beauty inspiration.
              </p>
              <form className="mt-8 flex flex-col gap-3 md:flex-row md:max-w-md md:mx-auto" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
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
      </section>
    </div>
  );
}

export default Home;