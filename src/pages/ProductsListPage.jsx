import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=12'

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
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setLoading(true)
      setError('')
      document.title = 'Kiln — Product Catalogue'

      try {
        const response = await fetch(PRODUCTS_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`The server responded with ${response.status}.`)
        }

        // /products is wrapped: { products, total, skip, limit }
        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [attempt])

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
              onClick={() => setAttempt((n) => n + 1)}
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
