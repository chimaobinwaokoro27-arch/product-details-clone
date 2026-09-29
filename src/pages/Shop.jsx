import { useEffect, useState, useMemo } from "react";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].sort();
    return ["all", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((product) =>
        selectedCategory === "all" ? true : product.category === selectedCategory
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [products, search, selectedCategory, sortBy]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3eb] py-20 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent mx-auto mb-4" />
        <h2 className="text-2xl text-gray-700">Loading products...</h2>
      </main>
    );
  }

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "rating", label: "Top Rated" },
  ];

  return (
    <main className="min-h-screen bg-[#f7f3eb] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">Our Collection</p>
            <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              Explore Our Products
            </h1>
            <p className="mt-2 text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full h-12 rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none h-10 rounded-full border border-gray-200 bg-white pl-10 pr-10 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat.replace(/-/g, " ")}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none h-10 rounded-full border border-gray-200 bg-white pl-4 pr-10 text-sm outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/10"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {(search || selectedCategory !== "all") && (
            <button
              onClick={() => { setSearch(""); setSelectedCategory("all"); }}
              className="h-10 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
            >
              <X className="inline h-4 w-4 mr-1.5" /> Clear
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory("all"); }}
              className="mt-6 rounded-full border border-black px-6 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Shop;
