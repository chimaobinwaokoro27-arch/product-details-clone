import { create } from 'zustand'

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

function addToItems(items, product) {
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

function incrementInItems(items, id) {
  return items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  )
}

function decrementInItems(items, id) {
  return items
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0)
}

function removeFromItems(items, id) {
  return items.filter((item) => item.id !== id)
}

// The feedback timer is not render-relevant state, so it lives outside the store
// rather than triggering renders.
let addedTimer = null

export const useCartStore = create((set) => ({
  items: readStoredCart(),
  lastAddedId: null,

  addItem: (product) => {
    set((state) => ({
      items: addToItems(state.items, product),
      lastAddedId: product.id,
    }))

    clearTimeout(addedTimer)
    addedTimer = setTimeout(() => set({ lastAddedId: null }), ADDED_FEEDBACK_MS)
  },

  increment: (id) => set((state) => ({ items: incrementInItems(state.items, id) })),

  decrement: (id) => set((state) => ({ items: decrementInItems(state.items, id) })),

  removeItem: (id) => set((state) => ({ items: removeFromItems(state.items, id) })),

  clearCart: () => set({ items: [] }),
}))

// Persist outside React. The old provider ran this in a useEffect keyed on `items`,
// which also rewrote the unchanged initial value on mount; subscribing to the actual
// change keeps the same stored data without the redundant write.
useCartStore.subscribe((state, previous) => {
  if (state.items !== previous.items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }
})

export const selectItemCount = (state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)

export const selectSubtotal = (state) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectIsEmpty = (state) => state.items.length === 0
