import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, removeHandler, userName }) => {
  const [fullView, setFullView] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  // console.log(userName)
  // console.log(blog.user.username)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    fontWeight: fullView ? 'bold' : 'normal'
  }

  const fullViewStyle = {
    // display: fullView ? '' : 'none',
    fontWeight: 'normal'
  }

  const toggleFullView = () => {
    setFullView(!fullView)
    {(buttonText === 'hide') ? setButtonText('view') : setButtonText('hide')}
  }

  const removeButton = () => {
    return (
      <div>
        <button onClick={handleRemove}>Remove</button>
      </div>
    )
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeHandler(blog)
    }
  }

  const extraInfo = () => {
    return (
      <div style={fullViewStyle}>
        <p>URL: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes} <button onClick={() => likeHandler(blog)}>like</button></p>
        <p>Added by: {blog.user.name}</p>
        {(blog.user.username === userName) && removeButton()}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleFullView}>{buttonText}</button>
      </div>

      {fullView && extraInfo()}

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
}

export default Blog