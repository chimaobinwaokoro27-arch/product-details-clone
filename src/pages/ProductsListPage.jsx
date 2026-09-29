import { useEffect } from 'react'
import { useProductListStore } from '../store/useProductListStore.js'
import ProductCard from '../components/ProductCard.jsx'

function CardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="aspect-square animate-pulse rounded-2xl bg-bone-100" />
      <div className="mt-5 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-bone-100" />
        <div className="h-6 w-16 animate-pulse rounded bg-bone-100" />
      </div>
      <div className="mt-4 h-[38px] w-28 animate-pulse rounded-full bg-bone-100" />
    </div>
  )
}

export default function ProductsListPage() {
  const products = useProductListStore((state) => state.products)
  const loading = useProductListStore((state) => state.loading)
  const error = useProductListStore((state) => state.error)
  const attempt = useProductListStore((state) => state.attempt)
  const loadProducts = useProductListStore((state) => state.loadProducts)
  const retry = useProductListStore((state) => state.retry)

  useEffect(() => {
    const controller = new AbortController()

    loadProducts(controller.signal)

    return () => controller.abort()
  }, [attempt, loadProducts])

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="max-w-xl">
        <p className="text-xs font-medium tracking-[0.18em] text-stone-400 uppercase">
          12 pieces
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-stone-900 sm:text-6xl">
          The current
          <br />
          collection.
        </h1>
      </div>

      <div className="mt-16 sm:mt-20">
        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16"
          >
            <span className="sr-only">Loading products</span>
            {Array.from({ length: 6 }, (_, i) => (
              <CardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="max-w-md rounded-2xl border border-clay-200 bg-clay-50 p-8"
          >
            <h2 className="font-display text-2xl text-stone-900">
              Could not load products
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-6 rounded-full bg-clay-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-700"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-stone-500">No products to show.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <ul className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
