import { useState } from 'react'
import PropTypes from 'prop-types'

const AddNew = ({ createBlogEntry }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const updateFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleBlogPost = (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    // console.log('App puolelta', blog)
    const responseStatus = createBlogEntry(blog)
    if (responseStatus) {
      updateFields()
    }
  }


  return (
    <div>
      <h2>Create new blog link</h2>
      <form onSubmit={handleBlogPost}>
        title: <input type='text' name='title' id='title-input' value={title} onChange={({ target }) => {setTitle(target.value)}} placeholder='title'/><br />
        author: <input type='text' name='author' id='author-input' value={author} onChange={({ target }) => {setAuthor(target.value)}} placeholder='author'/><br/>
        url: <input type='text' name='url' id='url-input' value={url} onChange={({ target }) => {setUrl(target.value)}} placeholder='url'/><br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

AddNew.propTypes = {
  createBlogEntry: PropTypes.func.isRequired
}

export default AddNew