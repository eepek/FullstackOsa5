import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const blogs = request.data
  console.log(blogs)
  return blogs
}

const addBlog = async (blog) => {
  const config = {
    headers: {Authorization: token },
  }
  console.log(config)
  console.log(blog)
  try {
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch(error) {
    console.log(error)
  }
  }


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addBlog, setToken}