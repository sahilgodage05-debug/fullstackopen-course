import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import useUserStore from '../stores/userStore'

const Container = styled.div`
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
`

const Title = styled.h2`
  color: #1a202c;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 800;
`

const SectionSub = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #4a5568;
  margin-bottom: 12px;
`

const BlogList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const BlogItem = styled.li`
  padding: 10px 14px;
  border: 1px solid #edf2f7;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #f7fafc;
  font-size: 15px;
`

const StyledLink = styled(Link)`
  color: #3182ce;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`

const UserDetail = () => {
  const { id } = useParams()
  const users = useUserStore(state => state.users)
  const user = users.find(u => u.id === id)

  if (!user) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>User not found</div>
  }

  return (
    <Container>
      <Title>{user.name}</Title>
      <SectionSub>added blogs</SectionSub>
      {user.blogs && user.blogs.length > 0 ? (
        <BlogList>
          {user.blogs.map(blog => (
            <BlogItem key={blog.id}>
              <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
            </BlogItem>
          ))}
        </BlogList>
      ) : (
        <p style={{ color: '#718096', fontSize: '14px' }}>No blogs added yet.</p>
      )}
    </Container>
  )
}

export default UserDetail
