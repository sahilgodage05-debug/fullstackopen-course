import { useFilter } from '../filterStore'
import { useNotify } from '../NotificationContext'
import { useVoteAnecdoteMutation, useDeleteAnecdoteMutation } from '../hooks/useAnecdotesQuery'

const AnecdoteList = ({ anecdotes = [] }) => {
  const filter = useFilter()
  const voteMutation = useVoteAnecdoteMutation()
  const deleteMutation = useDeleteAnecdoteMutation()
  const notify = useNotify()

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote, {
      onSuccess: () => {
        notify(`anecdote '${anecdote.content}' voted`)
      }
    })
  }

  const handleDelete = (anecdote) => {
    deleteMutation.mutate(anecdote.id, {
      onSuccess: () => {
        notify(`deleted '${anecdote.content}'`)
      }
    })
  }

  const filteredAnecdotes = anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: 10 }} data-testid="anecdote-item">
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)} style={{ marginLeft: 5 }}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
