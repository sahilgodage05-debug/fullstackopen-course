import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useBlogStore from '../stores/blogStore'
import useUserStore from '../stores/userStore'
import useNotificationStore from '../stores/notificationStore'
import { useField } from '../hooks/useField'

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

const CommentsSection = styled.div`
  margin-top: 32px;
  border-top: 1px solid #e2e8f0;
  padding-top: 24px;
`

const CommentsTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 16px;
`

const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`

const CommentItem = styled.li`
  padding: 10px 14px;
  background-color: #f7fafc;
  border: 1px solid #edf2f7;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
`

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`

const CommentInput = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 14px;
`

const CommentButton = styled.button`
  padding: 10px 18px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2b6cb0;
  }
`

const BlogDetails = ({
  blogs: propsBlogs,
  currentUser: propsCurrentUser,
  handleLike: propsHandleLike,
  handleDelete: propsHandleDelete
}) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const storeBlogs = useBlogStore(state => state.blogs)
  const storeLikeBlog = useBlogStore(state => state.likeBlog)
  const storeDeleteBlog = useBlogStore(state => state.deleteBlog)
  const storeAddComment = useBlogStore(state => state.addComment)

  const storeCurrentUser = useUserStore(state => state.user)
  const showNotification = useNotificationStore(state => state.showNotification)

  const commentField = useField('text')
  const { reset: resetComment, ...commentProps } = commentField

  const blogs = propsBlogs || storeBlogs
  const currentUser = propsCurrentUser || storeCurrentUser
  const likeBlog = propsHandleLike || storeLikeBlog
  const deleteBlog = propsHandleDelete || storeDeleteBlog
  const addComment = storeAddComment

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>Blog not found</div>
  }

  const isCreator = currentUser && blog.user && (blog.user.username === currentUser.username)

  const handleLike = async () => {
    try {
      await likeBlog(blog)
      showNotification(`Liked blog: ${blog.title}`)
    } catch (e) {
      showNotification(e.response?.data?.error || 'Failed to like blog', 'error')
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await deleteBlog(blog.id)
        showNotification(`Blog ${blog.title} by ${blog.author} removed`)
        navigate('/')
      } catch (e) {
        showNotification(e.response?.data?.error || 'Failed to delete blog', 'error')
      }
    }
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    if (!commentProps.value.trim()) return

    try {
      await addComment(blog.id, commentProps.value)
      showNotification('Comment added successfully')
      resetComment()
    } catch (e) {
      showNotification(e.response?.data?.error || 'Failed to add comment', 'error')
    }
  }

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
          <LikeButton onClick={handleLike}>
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
        <DeleteButton onClick={handleDelete}>
          remove
        </DeleteButton>
      )}

      <CommentsSection>
        <CommentsTitle>Comments</CommentsTitle>
        {blog.comments && blog.comments.length > 0 ? (
          <CommentsList>
            {blog.comments.map((c, index) => (
              <CommentItem key={index}>{c}</CommentItem>
            ))}
          </CommentsList>
        ) : (
          <p style={{ color: '#718096', fontSize: '14px', marginBottom: '20px' }}>No comments yet.</p>
        )}

        <CommentForm onSubmit={handleAddComment}>
          <CommentInput placeholder="Add a comment..." {...commentProps} />
          <CommentButton type="submit">add comment</CommentButton>
        </CommentForm>
      </CommentsSection>
    </DetailsContainer>
  )
}

export default BlogDetails
