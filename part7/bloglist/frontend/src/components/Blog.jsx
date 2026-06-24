import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    cursor: 'pointer'
  }

  return (
    <div style={blogStyle} className="blog">
      <Link
        to={`/blogs/${blog.id}`}
        style={{
          textDecoration: 'none',
          color: '#2d3748',
          fontWeight: '600',
          display: 'block',
          fontSize: '16px'
        }}
      >
        {blog.title} <span style={{ fontWeight: '400', color: '#718096' }}>by {blog.author}</span>
      </Link>
    </div>
  )
}

export default Blog