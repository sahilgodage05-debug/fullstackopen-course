import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes'

export const useAnecdotesQuery = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: 1,
  })
}

export const useCreateAnecdoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
}

export const useVoteAnecdoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (anecdote) => {
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      return anecdotesService.update(anecdote.id, updated)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
}

export const useDeleteAnecdoteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: anecdotesService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
}
