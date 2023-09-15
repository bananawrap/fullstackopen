import { useState } from "react"
import blogs from "../services/blogs"
import PropTypes from 'prop-types'

const Blog = ({ blog, user, triggerUpdate, handleUpdate }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = () => {
    event.preventDefault()
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user,
    }
    handleUpdate(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    event.preventDefault()
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogs.deleteBlog(blog.id).then(
        triggerUpdate(Math.random())
      )
    }
  }
  return (
    <div style={blogStyle}>
      {
        moreInfo &&
        <div>
          <div>
            {blog.title}
            <button type="button" onClick={() => setMoreInfo(false)}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
            <button type="button" onClick={handleLike}>like</button>
          </div>
          <div>
            {blog.author}
          </div>
          <div>
            {(user.username == blog.user.username) && <button type="button" onClick={handleDelete}>remove</button>}
          </div>
        </div>
      }
      {
        !moreInfo &&
        <div>
          {blog.title}
          <button type="button" onClick={() => setMoreInfo(true)}>view</button>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  triggerUpdate: PropTypes.func.isRequired,
}

export default Blog
