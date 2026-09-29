import { create } from 'zustand'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=12'

export const useProductListStore = create((set) => ({
  products: [],
  loading: true,
  error: '',
  attempt: 0,

  loadProducts: async (signal) => {
    set({ loading: true, error: '' })
    document.title = 'Kiln — Product Catalogue'

    try {
      const response = await fetch(PRODUCTS_URL, { signal })

      if (!response.ok) {
        throw new Error(`The server responded with ${response.status}.`)
      }

      // /products is wrapped: { products, total, skip, limit }
      const data = await response.json()
      set({ products: data.products })
    } catch (err) {
      if (err.name === 'AbortError') return
      set({ error: err.message || 'Something went wrong.' })
    } finally {
      set({ loading: false })
    }
  },

  retry: () => set((state) => ({ attempt: state.attempt + 1 })),
}))
