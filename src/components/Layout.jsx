import { Link, Outlet } from 'react-router-dom'
import CartDrawer from './CartDrawer.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-bone-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6 sm:px-8">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5 font-display text-2xl tracking-tight text-stone-900 sm:text-[28px]"
          >
            Kiln
            <span className="h-1.5 w-1.5 rounded-full bg-clay-600 transition-transform duration-300 group-hover:scale-150" />
          </Link>

          <nav className="flex items-center gap-8 text-sm text-stone-500">
            <Link to="/" className="transition-colors hover:text-clay-600">
              All products
            </Link>
            <CartDrawer />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-bone-200">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs tracking-wide text-stone-400 sm:px-8">
          Product data from dummyjson.com
        </div>
      </footer>
    </div>
  )
}
