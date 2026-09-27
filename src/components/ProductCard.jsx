import { Link } from 'react-router-dom'
import { formatPrice } from '../lib/formatPrice.js'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-600"
    >
      <div className="overflow-hidden rounded-2xl bg-bone-100 ring-1 ring-bone-200 transition-all duration-500 group-hover:ring-clay-200">
        <div className="aspect-square">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain p-10 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <div className="mt-5">
        <h3 className="line-clamp-1 text-[15px] font-medium text-stone-700 transition-colors group-hover:text-stone-900">
          {product.title}
        </h3>
        <p className="mt-1 text-xl font-semibold tabular-nums text-clay-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
