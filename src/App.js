import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import AddNew from './components/AddNew'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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
    setBlogs(await blogService.getAll())
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

    } catch(exception) {
      console.log(exception)
    }
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    try {
      const blog = {title, author, url}
      console.log('App puolelta', blog)
      await blogService.addBlog(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      fetchBlogs()

    } catch(error) {
      console.log(error)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  if (user) {

  return (

    /// 5.3 TEHTYNÄ SEURAAVAKSI 5.4
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in.</p>
      <button onClickCapture={logOut}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <AddNew handleBlogPost={handleBlogPost} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} title={title} author={author} url={url}/>
    </div>
  )
  } else {
  return (
    <div>
      <h2>log in to application</h2>
      <Login setUsername={setUsername} handleLogin={handleLogin} username={username}
      setPassword={setPassword} password={password}/>
    </div>
  )
  }

}

export default App