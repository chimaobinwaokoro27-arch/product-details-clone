import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useShallow } from 'zustand/react/shallow';

function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      isCartOpen: state.isCartOpen,
      closeCart: state.closeCart,
      updateQuantity: state.updateQuantity,
      removeItem: state.removeItem,
      getTotalPrice: state.getTotalPrice,
      clearCart: state.clearCart,
    }))
  );

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md justify-end bg-white shadow-2xl">
      <div className="flex h-full w-full max-w-md flex-col bg-[#f7f3eb] shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-900">
              <ShoppingBag size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Your cart</p>
              <h2 className="text-lg font-semibold text-gray-900">
                {items.reduce((sum, item) => sum + item.quantity, 0)} item{items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? "" : "s"}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-sm text-gray-600">Add a few favorites to see them here.</p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-3 shadow-sm">
                  <div className="flex gap-3">
                    <Link to={`/product/${item.id}`} onClick={closeCart} className="h-20 w-20 overflow-hidden rounded-xl bg-gray-100">
                      <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/product/${item.id}`} onClick={closeCart} className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-black">
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-gray-200 bg-gray-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity for ${item.title}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="min-w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 transition-colors hover:text-gray-900"
                            aria-label={`Increase quantity for ${item.title}`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <p className="text-base font-semibold text-gray-900"> ${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">${getTotalPrice().toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              <Link
                to="/cart"
                onClick={closeCart}
                className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
              >
                View cart
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
              >
                Clear cart
              </button>

              <Link
                to="/cart"
                onClick={closeCart}
                className="flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
