import { create } from 'zustand'
import anecdotesService from './services/anecdotes'

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  actions: {
    setAnecdotes: (anecdotes) => set({ anecdotes }),
    vote: async (id) => {
      const anecdotes = get().anecdotes
      const anecdoteToChange = anecdotes.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const updatedAnecdote = await anecdotesService.update(id, changedAnecdote)
      set({
        anecdotes: anecdotes.map(a => a.id === id ? updatedAnecdote : a)
      })
      return updatedAnecdote
    },
    createAnecdote: async (content) => {
      const newAnecdote = await anecdotesService.createNew(content)
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
      return newAnecdote
    },
    deleteAnecdote: async (id) => {
      await anecdotesService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    }
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
