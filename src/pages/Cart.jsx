import { useCartStore } from "../store/cartStore";
import { useShallow } from 'zustand/react/shallow';
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, Heart, ArrowLeft, Shield, Truck, RotateCcw } from "lucide-react";

function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      getTotalPrice: state.getTotalPrice,
      clearCart: state.clearCart,
    }))
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f3eb] flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Heart size={48} className="text-gray-300" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-3 text-lg text-gray-600">
            Looks like you haven't added any products yet.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-white transition-all hover:bg-gray-800 hover:scale-[1.02]"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3eb] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Shopping Cart</h1>
            <p className="mt-2 text-gray-600">
              {items.reduce((sum, i) => sum + i.quantity, 0)} {items.reduce((sum, i) => sum + i.quantity, 0) === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="hidden text-sm font-medium text-gray-500 hover:text-red-500 md:inline-flex"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
              {/* Table Header - Desktop Only */}
              <div className="hidden border-b border-gray-100 px-6 py-4 lg:grid lg:grid-cols-12 lg:gap-4">
                <div className="lg:col-span-5 font-medium text-gray-500">Product</div>
                <div className="lg:col-span-2 font-medium text-gray-500 text-center">Price</div>
                <div className="lg:col-span-2 font-medium text-gray-500 text-center">Quantity</div>
                <div className="lg:col-span-2 font-medium text-gray-500 text-right">Total</div>
                <div className="lg:col-span-1" />
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 p-4 lg:grid lg:grid-cols-12 lg:gap-4 lg:p-6 lg:items-center"
                  >
                    {/* Product Info */}
                    <div className="flex gap-4 lg:col-span-5">
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-xl overflow-hidden bg-gray-50">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col justify-center min-w-0">
                        <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-black line-clamp-1">
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-500 capitalize">{item.category.replace(/-/g, " ")}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => alert("Move to wishlist - not implemented")}
                            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Heart size={16} /> Save for later
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="lg:col-span-2 lg:text-center text-center text-gray-900 font-medium">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center lg:col-span-2 lg:justify-center">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-3 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
                            updateQuantity(item.id, val);
                          }}
                          min="1"
                          max="99"
                          className="w-16 text-center border-x border-gray-200 outline-none text-base font-medium"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="lg:col-span-2 lg:text-right text-right">
                      <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    {/* Mobile Remove */}
                    <div className="lg:hidden">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        <Trash2 className="inline h-4 w-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white shadow-sm p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                  <span className="font-medium text-gray-900">${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{getTotalPrice() >= 50 ? "Free" : "Calculated at checkout"}</span>
                </div>

                {getTotalPrice() < 50 && (
                  <div className="text-sm text-green-600">
                    Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Estimated Tax</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Checkout functionality - integrate with payment provider')}
                className="mt-8 w-full rounded-full bg-black py-4 text-white font-medium transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="mt-4 w-full rounded-full border border-gray-200 bg-white py-4 text-gray-600 font-medium transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                Clear Cart
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield size={14} className="text-green-500" />
                <span>Secure checkout</span>
                <span>•</span>
                <Truck size={14} className="text-green-500" />
                <span>Free shipping $50+</span>
                <span>•</span>
                <RotateCcw size={14} className="text-green-500" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;