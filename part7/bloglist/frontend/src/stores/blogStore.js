import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set, get) => ({
  blogs: [],
  fetchBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },
  createBlog: async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    set({ blogs: get().blogs.concat(newBlog) })
    return newBlog
  },
  likeBlog: async (blog) => {
    const updatedBlogData = {
      user: blog.user?.id || blog.user?._id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments || []
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlogData)
    const populatedReturnedBlog = { ...returnedBlog, user: blog.user }
    set({
      blogs: get().blogs.map(b => b.id === blog.id ? populatedReturnedBlog : b)
    })
  },
  deleteBlog: async (id) => {
    await blogService.remove(id)
    set({ blogs: get().blogs.filter(b => b.id !== id) })
  },
  addComment: async (blogId, comment) => {
    const returnedBlog = await blogService.addComment(blogId, comment)
    set({
      blogs: get().blogs.map(b => b.id === blogId ? { ...b, comments: returnedBlog.comments } : b)
    })
  }
}))

export default useBlogStore
