import { useEffect, useReducer, useRef, useState } from 'react'
import { CartContext } from '../lib/cart-context.js'

const STORAGE_KEY = 'kiln.cart.v1'
const ADDED_FEEDBACK_MS = 1600

function readStoredCart() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const product = action.product
      const alreadyInCart = items.some((item) => item.id === product.id)

      if (alreadyInCart) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ]
    }

    case 'increment':
      return items.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      )

    case 'decrement':
      return items
        .map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0)

    case 'remove':
      return items.filter((item) => item.id !== action.id)

    case 'clear':
      return []

    default:
      return items
  }
}

export default function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readStoredCart)
  const [lastAddedId, setLastAddedId] = useState(null)
  const addedTimer = useRef(null)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    return () => clearTimeout(addedTimer.current)
  }, [])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  function addItem(product) {
    dispatch({ type: 'add', product })

    setLastAddedId(product.id)
    clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setLastAddedId(null), ADDED_FEEDBACK_MS)
  }

  const value = {
    items,
    itemCount,
    subtotal,
    isEmpty: items.length === 0,
    lastAddedId,
    addItem,
    increment: (id) => dispatch({ type: 'increment', id }),
    decrement: (id) => dispatch({ type: 'decrement', id }),
    removeItem: (id) => dispatch({ type: 'remove', id }),
    clearCart: () => dispatch({ type: 'clear' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
