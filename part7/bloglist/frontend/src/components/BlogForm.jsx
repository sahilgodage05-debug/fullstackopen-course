import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useField } from '../hooks/useField'
import useBlogStore from '../stores/blogStore'
import useNotificationStore from '../stores/notificationStore'

const FormContainer = styled.div`
  max-width: 500px;
  margin: 30px 0;
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
`

const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: #2d3748;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #48bb78;
  }
`

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #48bb78;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #38a169;
  }

  &:active {
    transform: scale(0.98);
  }
`

const BlogForm = ({ createBlog: propsCreateBlog }) => {
  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  const { reset: resetTitle, ...titleProps } = titleField
  const { reset: resetAuthor, ...authorProps } = authorField
  const { reset: resetUrl, ...urlProps } = urlField

  const storeCreateBlog = useBlogStore(state => state.createBlog)
  const createBlog = propsCreateBlog || storeCreateBlog
  const showNotification = useNotificationStore(state => state.showNotification)
  const navigate = useNavigate()

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await createBlog({
        title: titleProps.value,
        author: authorProps.value,
        url: urlProps.value
      })
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      resetTitle()
      resetAuthor()
      resetUrl()
      navigate('/')
    } catch (exception) {
      showNotification(
        exception.response?.data?.error || 'Failed to create blog',
        'error'
      )
    }
  }

  return (
    <FormContainer>
      <FormTitle>Create a new blog</FormTitle>
      <form onSubmit={handleCreateBlog}>
        <FormGroup>
          <Label>Title</Label>
          <Input name="Title" {...titleProps} placeholder="Blog Title" />
        </FormGroup>
        <FormGroup>
          <Label>Author</Label>
          <Input name="Author" {...authorProps} placeholder="Blog Author" />
        </FormGroup>
        <FormGroup>
          <Label>URL</Label>
          <Input name="Url" {...urlProps} placeholder="Blog URL" />
        </FormGroup>
        <SubmitButton type="submit">Create</SubmitButton>
      </form>
    </FormContainer>
  )
}

export default BlogForm
