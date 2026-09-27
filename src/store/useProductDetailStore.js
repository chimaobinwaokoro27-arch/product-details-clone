import { create } from 'zustand'

const API_BASE = 'https://dummyjson.com/products'

export const useProductDetailStore = create((set) => ({
  product: null,
  loading: true,
  error: '',
  attempt: 0,

  loadProduct: async (id, signal) => {
    set({ loading: true, error: '', product: null })

    try {
      const response = await fetch(`${API_BASE}/${id}`, { signal })

      if (!response.ok) {
        throw new Error(`The server responded with ${response.status}.`)
      }

      // /products/:id is NOT wrapped — the response IS the product.
      const data = await response.json()
      set({ product: data })
      document.title = `${data.title} — Kiln`
    } catch (err) {
      if (err.name === 'AbortError') return
      set({ error: err.message || 'Something went wrong.' })
    } finally {
      set({ loading: false })
    }
  },

  retry: () => set((state) => ({ attempt: state.attempt + 1 })),
}))
