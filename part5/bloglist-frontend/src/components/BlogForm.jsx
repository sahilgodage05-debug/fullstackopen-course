import { useState } from 'react'
import styled from 'styled-components'

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
  fontWeight: 700;
  font-size: 15px;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #38a169;
  }

  &:active {
    transform: scale(0.98);
  }
`

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <FormContainer>
      <FormTitle>Create a new blog</FormTitle>
      <form onSubmit={handleCreateBlog}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Blog Title"
          />
        </FormGroup>
        <FormGroup>
          <Label>Author</Label>
          <Input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Blog Author"
          />
        </FormGroup>
        <FormGroup>
          <Label>URL</Label>
          <Input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Blog URL"
          />
        </FormGroup>
        <SubmitButton type="submit">Create</SubmitButton>
      </form>
    </FormContainer>
  )
}

export default BlogForm
