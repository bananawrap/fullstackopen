import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/login'

const BlogForm = ({ submitHandler }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>
            title:
            <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
          </label>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('user')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])



  const handleLogout = () => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('user')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button type='button' onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
