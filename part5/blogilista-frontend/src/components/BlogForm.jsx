import { useState } from "react"

const BlogForm = ({ submitHandler, setCreateBlogVisible }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={() => submitHandler(newTitle, newAuthor, newUrl)}>
        <div>
          <label>
            Title:
            <input id="title" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input id="author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input id="url" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
          </label>
        </div>
        <div>
          <input id="blog-submit" type='submit' value='create' />
          <button type='button' onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
