import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link
        to={`/product/${product.id}`}
        className="block"
      >
        <div className="relative h-64 overflow-hidden">
          {!imageError && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
              <span className="text-sm">Image unavailable</span>
            </div>
          )}
          {/* Quick Add Button on Hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-white/90 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-105"
            >
              Quick Add
            </button>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {product.category.replace(/-/g, " ")}
        </p>

        <Link to={`/product/${product.id}`}>
          <h2 className="mt-1.5 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
            {product.title}
          </h2>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <Link
              to={`/product/${product.id}`}
              className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 md:inline-flex"
            >
              View
            </Link>
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
            >
              {showAdded ? "Added ✓" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
