import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogDetails from './components/BlogDetails'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import UserDetail from './components/UserDetail'
import ErrorBoundary from './components/ErrorBoundary'

import useBlogStore from './stores/blogStore'
import useUserStore from './stores/userStore'
import useNotificationStore from './stores/notificationStore'

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

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 48px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-family: system-ui, sans-serif;
  color: #4a5568;
`

const App = () => {
  const blogs = useBlogStore(state => state.blogs)
  const fetchBlogs = useBlogStore(state => state.fetchBlogs)

  const user = useUserStore(state => state.user)
  const initializeUser = useUserStore(state => state.initializeUser)
  const clearUser = useUserStore(state => state.clearUser)

  const showNotification = useNotificationStore(state => state.showNotification)

  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogs()
    initializeUser()
  }, [fetchBlogs, initializeUser])

  const handleLogout = () => {
    clearUser()
    showNotification('Logged out successfully')
    navigate('/')
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <PageWrapper>
      <NavBar>
        <NavGroup>
          <StyledLink to="/">Blogs</StyledLink>
          <StyledLink to="/users">Users</StyledLink>
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

      <Notification />

      <ErrorBoundary>
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

          <Route path="/login" element={<LoginForm />} />

          <Route path="/create" element={
            user ? (
              <BlogForm />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                Please log in to create a new blog.
              </div>
            )
          } />

          <Route path="/blogs/:id" element={<BlogDetails />} />

          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />

          {/* Splat route for nonexisting paths */}
          <Route path="*" element={
            <NotFoundContainer>
              <h2>Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
              <StyledLink to="/" style={{ color: '#3182ce', display: 'inline-block', marginTop: '12px' }}>
                Go back to home
              </StyledLink>
            </NotFoundContainer>
          } />
        </Routes>
      </ErrorBoundary>
    </PageWrapper>
  )
}

export default App