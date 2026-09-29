import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";

function Navbar() {
  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 hover:text-gray-500 ${isActive ? "font-semibold text-gray-900" : "text-gray-700"}`;
  const cartCount = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl transition-colors hover:text-gray-700">
          Aurae Beauty.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-10">
          <NavLink to="/shop" className={navLinkStyle}>Shop</NavLink>
          <NavLink to="/about" className={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10 placeholder:text-gray-400"
              aria-label="Search products"
            />
          </div>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Shopping bag, ${cartCount} items`}
            className="relative rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          <Link
            to="/signin"
            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-all hover:border-black hover:text-gray-900 hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 animate-slide-down">
          <div className="flex flex-col gap-4">
            <NavLink to="/shop" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Shop</NavLink>
            <NavLink to="/about" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-black focus:bg-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                onClick={() => {
                  openCart();
                  setMobileMenuOpen(false);
                }}
              >
                <ShoppingBag size={20} />
                <span>Cart {cartCount > 0 ? `(${cartCount})` : ''}</span>
              </button>
              <Link to="/signin" className="text-gray-700 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>
                <User size={20} />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white px-4 py-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setSearchOpen(false)} className="p-2 text-gray-500 hover:text-gray-900"><X size={24} /></button>
            <Search className="h-6 w-6 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="flex-1 h-12 rounded-full border border-gray-200 bg-gray-50 pl-4 pr-4 text-base outline-none focus:border-black focus:bg-white"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
