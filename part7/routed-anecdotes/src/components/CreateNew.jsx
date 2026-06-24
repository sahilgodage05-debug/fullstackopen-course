import { useField, useAnecdotes } from '../hooks'
import { useNavigate } from 'react-router-dom'

const CreateNew = () => {
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const { addAnecdote } = useAnecdotes()
  const navigate = useNavigate()

  const { reset: resetContent, ...content } = contentField
  const { reset: resetAuthor, ...author } = authorField
  const { reset: resetInfo, ...info } = infoField

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
