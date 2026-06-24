import { useCreateAnecdoteMutation } from '../hooks/useAnecdotesQuery'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const createAnecdoteMutation = useCreateAnecdoteMutation()
  const notify = useNotify()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.trim()) {
      createAnecdoteMutation.mutate(content, {
        onSuccess: () => {
          notify(`anecdote '${content}' created`)
        },
        onError: (error) => {
          notify(error.message || 'too short anecdote, must have length 5 or more')
        }
      })
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
