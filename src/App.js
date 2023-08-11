import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import AddNew from './components/AddNew'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [infoType, setInfoType] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const blogPostRef = useRef()


  useEffect(() => {
    fetchBlogs()
  },[])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)

    }
  }, [])

  async function fetchBlogs() {
    const fetched = await blogService.getAll()
    const sorted = fetched.sort((blog1, blog2) => (blog1.likes > blog2.likes) ? -1 : (blog2.likes > blog1.likes) ? 1 : 0)
    setBlogs(sorted)
  }

  const infoHandler = (type, message) => {
    setInfoType(type)
    setInfoMessage(message)
    setTimeout(() => {
      setInfoType(false)
      setInfoMessage(null)
    }, 4321)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      fetchBlogs()
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

    } catch(exception) {
      console.log(exception)
      infoHandler('error', 'Incorrect username or password')
    }
  }

  const addBlog = async (blog) => {
    try {
      const response = await blogService.addBlog(blog)
      if (response.status !== 400) {
        blogPostRef.current.toggleVisibility()
        fetchBlogs()
        infoHandler('info', `Blog "${blog.title}" by ${blog.author} added`)
        return true
      }
    } catch(error) {
      console.log(error)
      infoHandler('error', 'Could not add blog to database')
      return false
    }
  }

  const likeHandler = async (blog) => {
    const userId = blog.user.id
    const blogId = blog.id.toString()
    blog.user = userId
    delete blog.id
    blog.likes = blog.likes + 1
    // console.log(blog)
    const response = await blogService.updateBlog(blog, blogId)
    // console.log(response.status)
    if (response.status === 200) {
      fetchBlogs()
    }
  }

  const removeHandler = async (blog) => {
    const blogId = blog.id
    const response = await blogService.removeBlog(blogId)
    if (response.status === 204) {
      fetchBlogs()
      infoHandler('info', `${blog.title} by ${blog.author} has been removed`)
    } else {
      infoHandler('error', 'Could not remove blog from database')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  if (user) {

    return (

      <div>
        <h2>Blogs</h2>
        <Notification message={infoMessage} type={infoType}/>
        <p>{user.name} is logged in.</p>
        <button onClickCapture={logOut}>Logout</button><br />
        <br/>
        <Togglable buttonLabel='Add blog' ref={blogPostRef}>
          <AddNew createBlogEntry={addBlog} infoHandler={infoHandler} />
        </Togglable>
        <br />
        <div id='blog-div-for-testing'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeHandler={likeHandler} removeHandler={removeHandler} userName={user.username}/>
          )}
        </div>
      </div>
    )
  } else {

    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={infoMessage} type={infoType}/>
        <Login setUsername={setUsername} handleLogin={handleLogin} userName={username}
          setPassword={setPassword} password={password}/>
      </div>
    )
  }

}

export default App