import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  filter: '',
  actions: {
    setFilter: (filter) => set({ filter }),
  }
}))

export const useFilter = () => useFilterStore((state) => state.filter)
export const useFilterActions = () => useFilterStore((state) => state.actions)

export default useFilterStore
