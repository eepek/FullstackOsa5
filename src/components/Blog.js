import { useState } from "react"

const Blog = ({blog, likeHandler, removeHandler, userName}) => {
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
    display: fullView ? '' : 'none',
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

  return (
  <div style={blogStyle}>
    <div >
      {blog.title} {blog.author} <button onClick={toggleFullView}>{buttonText}</button>
    </div>

    <div style={fullViewStyle}>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes}<button onClick={() => likeHandler(blog)}>like</button><br />
      {blog.user.name}<br />
      {(blog.user.username === userName) && removeButton()}
    </div>


  </div>
  )
  }

export default Blog