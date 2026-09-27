import { useEffect, useState } from 'react'
import { formatPrice } from '../lib/formatPrice.js'
import {
  selectIsEmpty,
  selectItemCount,
  selectSubtotal,
  useCartStore,
} from '../store/useCartStore.js'
import CartIcon from './CartIcon.jsx'

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const itemCount = useCartStore(selectItemCount)
  const subtotal = useCartStore(selectSubtotal)
  const isEmpty = useCartStore(selectIsEmpty)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative -mr-1 p-1 text-stone-600 transition-colors hover:text-clay-600"
        aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
      >
        <CartIcon className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay-600 px-1 text-[11px] leading-none font-semibold text-white">
            {itemCount}
          </span>
        )}
      </button>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close cart"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-stone-900/25 backdrop-blur-[2px]"
        />

        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-bone-50 shadow-2xl transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-bone-200 px-6 py-5">
            <h2 className="font-display text-2xl text-stone-900">Your cart</h2>
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="text-sm text-stone-500 transition-colors hover:text-clay-600"
            >
              Close
            </button>
          </div>

          {isEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <CartIcon className="h-8 w-8 text-stone-300" />
              <p className="text-sm text-stone-500">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="flex-1 divide-y divide-bone-200 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-bone-100">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="h-full w-full object-contain p-2"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-stone-800">
                      {item.title}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-bone-200">
                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          onClick={() => decrement(item.id)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          className="h-7 w-7 text-sm text-stone-500 transition-colors hover:text-clay-600"
                        >
                          &minus;
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          onClick={() => increment(item.id)}
                          aria-label={`Increase quantity of ${item.title}`}
                          className="h-7 w-7 text-sm text-stone-500 transition-colors hover:text-clay-600"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-semibold tabular-nums text-stone-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    className="h-fit text-xs text-stone-400 transition-colors hover:text-clay-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-bone-200 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-stone-500">Subtotal</span>
              <span className="text-2xl font-semibold tabular-nums text-clay-600">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={clearCart}
              disabled={isEmpty}
              className="mt-5 w-full rounded-full border border-bone-200 py-3 text-sm font-medium text-stone-600 transition-colors hover:border-clay-200 hover:text-clay-600 disabled:pointer-events-none disabled:opacity-40"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
