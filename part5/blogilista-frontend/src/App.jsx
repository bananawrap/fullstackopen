import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(['', ''])
  const [loginVisible, setLoginVisible] = useState(true)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [updateTrigger, triggerUpdate] = useState(0)
  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs)
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    )
  }, [updateTrigger])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('user')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      loginService
        .verify(user.token)
        .then(response => {
          setUser(user)
          setLoginVisible(false)
        })
        .catch(exception => {
          setUser(null)
        })
    }
  }, [updateTrigger])



  const handleLogout = () => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const handleSubmit = (title, author, url) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url,
    }
    blogService
      .newBlog(newObject, user.token)
      .then(response => {
        setBlogs(blogs.concat(response))
        setNotification([`a new blog ${title} by ${author} added`, 'success'])
        setCreateBlogVisible(false)
        triggerUpdate(Math.random())
        setTimeout(() => {
          setNotification(['', ''])
        }, 3000)
      })
      .catch(error => {
        setNotification([error.response.data.error, 'error'])
        setTimeout(() => {
          setNotification(['', ''])
        }, 4000)
      })
    console.log()
  }

  const handleUpdate = async (id, blog) => {
    await blogService.updateBlog(id, blog)
    triggerUpdate(Math.random())
  }

  if (loginVisible) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} notification={notification} setNotification={setNotification} setLoginVisible={setLoginVisible} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification[0]} msgClass={notification[1]} />
      {
        user &&
        <div>
          <p>{user.name} logged in</p>
          <button type='button' onClick={handleLogout}>logout</button>
        </div>
      }
      {!user && <button type='button' onClick={() => setLoginVisible(true)} >login</button>}
      {
        user && createBlogVisible &&
        <BlogForm submitHandler={handleSubmit} setCreateBlogVisible={setCreateBlogVisible} />
      }
      {
        user && !createBlogVisible
        && <button
          id='new-blog'
          type='button'
          onClick={() => setCreateBlogVisible(true)}>
          new blog
        </button>
      }
      <ul className='blogs'>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} triggerUpdate={triggerUpdate} handleUpdate={handleUpdate} />)}
      </ul>
    </div>
  )
}

export default App
