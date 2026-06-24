import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const DetailsContainer = styled.div`
  padding: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
  max-width: 600px;
  margin: 30px auto;
`

const BlogTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1a202c;
  letter-spacing: -0.5px;
  line-height: 1.25;
`

const DetailRow = styled.div`
  margin-bottom: 14px;
  font-size: 16px;
  display: flex;
  align-items: center;
`

const DetailLabel = styled.span`
  color: #718096;
  font-weight: 600;
  min-width: 90px;
`

const DetailValue = styled.span`
  color: #2d3748;
  font-weight: 500;
`

const UrlLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s;

  &:hover {
    color: #2b6cb0;
    text-decoration: underline;
  }
`

const LikeButton = styled.button`
  margin-left: 12px;
  padding: 6px 14px;
  background-color: #ebf8ff;
  border: 1px solid #bee3f8;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #2b6cb0;
  font-weight: 700;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #e2f2ff;
  }

  &:active {
    transform: scale(0.96);
  }
`

const DeleteButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #c53030;
  font-weight: 700;
  transition: background-color 0.2s, transform 0.1s;
  display: block;

  &:hover {
    background-color: #fff0f0;
  }

  &:active {
    transform: scale(0.96);
  }
`

const BlogDetails = ({ blogs, handleLike, handleDelete, currentUser }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>Blog not found</div>
  }

  const isCreator = currentUser && blog.user && (blog.user.username === currentUser.username)

  return (
    <DetailsContainer className="blog-details">
      <BlogTitle>{blog.title}</BlogTitle>
      <DetailRow>
        <DetailLabel>Author</DetailLabel>
        <DetailValue>{blog.author}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>URL</DetailLabel>
        <UrlLink href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </UrlLink>
      </DetailRow>
      <DetailRow>
        <DetailLabel>Likes</DetailLabel>
        <DetailValue style={{ fontWeight: '700', fontSize: '18px' }}>{blog.likes}</DetailValue>
        {currentUser && (
          <LikeButton onClick={() => handleLike(blog)}>
            like
          </LikeButton>
        )}
      </DetailRow>
      {blog.user && (
        <DetailRow>
          <DetailLabel>Added by</DetailLabel>
          <DetailValue>{blog.user.name}</DetailValue>
        </DetailRow>
      )}
      {currentUser && isCreator && (
        <DeleteButton onClick={() => handleDelete(blog)}>
          remove
        </DeleteButton>
      )}
    </DetailsContainer>
  )
}

export default BlogDetails
