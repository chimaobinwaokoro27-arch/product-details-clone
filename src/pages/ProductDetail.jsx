import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(0);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const productWithQty = { ...product, quantity };
    addItem(productWithQty);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  const images = product?.images || (product?.thumbnail ? [product.thumbnail] : []);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7f3eb] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3eb] px-4 py-12 md:px-8 md:py-16">
      {/* Toast */}
      {showAddedToast && (
        <div className="fixed top-20 right-4 z-50 animate-slide-down">
          <div className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white shadow-xl">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">✓</span>
            <span className="font-medium">{product.title} added to cart</span>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-700">Shop</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.category.replace(/-/g, " ")}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="overflow-hidden rounded-3xl bg-white">
              <img
                src={images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-[500px] md:h-[600px] object-cover transition-opacity duration-300"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                      index === selectedImage
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === selectedImage ? "true" : "false"}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category & Actions */}
            <div className="mb-4 flex items-center justify-between">
              <Link
                to="/shop"
                className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
              >
                ← Back to shop
              </Link>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </button>
                <button
                  className="p-2 rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Share product"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Category Badge */}
            <p className="mb-2 uppercase tracking-widest text-xs text-gray-500">
              {product.category.replace(/-/g, " ")}
            </p>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl md:leading-tight">
              {product.title}
            </h1>

            {/* Rating & Price */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-medium text-gray-900">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount || "128"} reviews)</span>
              </div>
              <span className="h-6 w-px bg-gray-200" />
              <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="mt-3 text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 text-green-600"><Truck size={18} /></div>
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600"><Shield size={18} /></div>
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-500">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-50 text-purple-600"><RotateCcw size={18} /></div>
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-500">30-day policy</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="99"
                    className="w-16 text-center border-none outline-none text-lg font-medium"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8" aria-label="Product details tabs">
              {["Description", "Ingredients", "How to Use", "Reviews"].map((tab) => (
                <button
                  key={tab}
                  className="pb-4 text-sm font-medium text-gray-500 border-b-2 border-transparent transition-colors hover:text-gray-900"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8 prose prose-gray max-w-none">
            <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
            <h4 className="mt-8 text-lg font-semibold text-gray-900">Key Features</h4>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li>• {product.category.replace(/-/g, " ")} category</li>
              <li>• Weight: {product.weight || "Varies"}g</li>
              <li>• Dimensions: {product.dimensions?.width || "N/A"} x {product.dimensions?.height || "N/A"} x {product.dimensions?.depth || "N/A"} cm</li>
              <li>• Brand: {product.brand || "Veloura Beauty"}</li>
              <li>• SKU: {product.sku || product.id}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
