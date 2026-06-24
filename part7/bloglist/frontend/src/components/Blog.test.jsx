import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import BlogDetails from './BlogDetails'

describe('BlogDetails component tests', () => {
  const blogs = [
    {
      id: '5a43fde2cbd20b12a2c34e91',
      title: 'Testing React Components',
      author: 'Test Author',
      url: 'https://testing-react.com',
      likes: 12,
      user: {
        username: 'tester',
        name: 'Mister Tester'
      }
    }
  ]

  test('blog info and likes are displayed to unauthenticated users, buttons are not displayed', () => {
    render(
      <MemoryRouter initialEntries={['/blogs/5a43fde2cbd20b12a2c34e91']}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} currentUser={null} />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Testing React Components')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('https://testing-react.com')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()

    // Like and remove buttons should NOT be displayed
    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('authenticated users who are not the creator are shown only the like button', () => {
    const currentUser = {
      username: 'another_user',
      name: 'Another User'
    }

    render(
      <MemoryRouter initialEntries={['/blogs/5a43fde2cbd20b12a2c34e91']}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} currentUser={currentUser} />} />
        </Routes>
      </MemoryRouter>
    )

    // Like button should be visible
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    // Remove button should NOT be visible
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('the blog creator is shown both the like and delete buttons', () => {
    const currentUser = {
      username: 'tester',
      name: 'Mister Tester'
    }

    render(
      <MemoryRouter initialEntries={['/blogs/5a43fde2cbd20b12a2c34e91']}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} currentUser={currentUser} />} />
        </Routes>
      </MemoryRouter>
    )

    // Both like and remove buttons should be visible
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
  })

  test('like button clicks are handled correctly', async () => {
    const mockLikeHandler = vi.fn()
    const currentUser = {
      username: 'another_user',
      name: 'Another User'
    }

    render(
      <MemoryRouter initialEntries={['/blogs/5a43fde2cbd20b12a2c34e91']}>
        <Routes>
          <Route path="/blogs/:id" element={
            <BlogDetails blogs={blogs} currentUser={currentUser} handleLike={mockLikeHandler} />
          } />
        </Routes>
      </MemoryRouter>
    )

    const user = userEvent.setup()
    const likeButton = screen.getByRole('button', { name: 'like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})
