import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogDetails from './components/BlogDetails'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f7fafc;
  min-height: 100vh;
`

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a202c;
  padding: 14px 28px;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const StyledLink = styled(Link)`
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: color 0.15s;

  &:hover {
    color: #ffffff;
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const LoggedInText = styled.span`
  font-size: 14px;
  color: #cbd5e0;
  font-weight: 500;
`

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  transition: background-color 0.15s, transform 0.1s;

  &:hover {
    background-color: #c53030;
  }

  &:active {
    transform: scale(0.96);
  }
`

const SectionTitle = styled.h2`
  color: #2d3748;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
`

const BlogListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Notification state
  const [notification, setNotification] = useState({ message: null, type: null })

  const navigate = useNavigate()

  // Fetch blogs on startup
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  // Check local storage for logged in user on startup
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Logged in successfully as ${user.name}`)
      navigate('/')
    } catch (exception) {
      showNotification(
        exception.response?.data?.error || 'Wrong username or password',
        'error'
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification('Logged out successfully')
    navigate('/')
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      navigate('/')
    } catch (exception) {
      showNotification(
        exception.response?.data?.error || 'Failed to create blog',
        'error'
      )
    }
  }

  const handleLikeBlog = async (blog) => {
    try {
      const updatedBlogData = {
        user: blog.user?.id || blog.user?._id || blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const returnedBlog = await blogService.update(blog.id, updatedBlogData)
      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
    } catch (exception) {
      showNotification(
        exception.response?.data?.error || 'Failed to like blog',
        'error'
      )
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showNotification(`Blog ${blog.title} by ${blog.author} removed`)
        navigate('/')
      } catch (exception) {
        showNotification(
          exception.response?.data?.error || 'Failed to delete blog',
          'error'
        )
      }
    }
  }

  // Sort blogs by likes in descending order
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <PageWrapper>
      <NavBar>
        <NavGroup>
          <StyledLink to="/">Blogs</StyledLink>
          {user && <StyledLink to="/create">Create New</StyledLink>}
        </NavGroup>
        <UserInfo>
          {user ? (
            <>
              <LoggedInText>{user.name} logged in</LoggedInText>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <StyledLink to="/login">Login</StyledLink>
          )}
        </UserInfo>
      </NavBar>

      <Notification message={notification.message} type={notification.type} />

      <Routes>
        <Route path="/" element={
          <div>
            <SectionTitle>Blogs List</SectionTitle>
            <BlogListContainer>
              {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </BlogListContainer>
          </div>
        } />
        
        <Route path="/login" element={
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        } />

        <Route path="/create" element={
          user ? (
            <BlogForm createBlog={handleCreateBlog} />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
              Please log in to create a new blog.
            </div>
          )
        } />

        <Route path="/blogs/:id" element={
          <BlogDetails
            blogs={blogs}
            handleLike={handleLikeBlog}
            handleDelete={handleDeleteBlog}
            currentUser={user}
          />
        } />
      </Routes>
    </PageWrapper>
  )
}

export default App