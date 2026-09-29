import { create } from 'zustand'

export const useCartDrawerStore = create((set) => ({
  isOpen: false,

  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
}))
