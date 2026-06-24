import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm component tests', () => {
  test('calls createBlog event handler with the right details when a new blog is created', async () => {
    const createBlogMock = vi.fn()
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <BlogForm createBlog={createBlogMock} />
      </MemoryRouter>
    )

    const titleInput = screen.getByPlaceholderText('Blog Title')
    const authorInput = screen.getByPlaceholderText('Blog Author')
    const urlInput = screen.getByPlaceholderText('Blog URL')
    const submitButton = screen.getByText('Create')

    await user.type(titleInput, 'First Class Tests')
    await user.type(authorInput, 'Kent Beck')
    await user.type(urlInput, 'https://kentbeck.com')
    await user.click(submitButton)

    expect(createBlogMock).toHaveBeenCalledTimes(1)
    expect(createBlogMock.mock.calls[0][0]).toEqual({
      title: 'First Class Tests',
      author: 'Kent Beck',
      url: 'https://kentbeck.com'
    })
  })
})
