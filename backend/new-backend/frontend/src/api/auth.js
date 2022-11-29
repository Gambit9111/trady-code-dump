import axios from 'axios'
const loginUrl = 'http://localhost:8000/auth/api/token/'
const refreshUrl = 'http://localhost:8000/auth/api/token/refresh/'
const protectedUrl = 'http://localhost:8000/auth/api/protected/'


const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  // add username to the response
  response.data.email = credentials.email
  return response.data
}

const refresh = async () => {
  // get the refresh token from local storage user object
  const user = JSON.parse(window.localStorage.getItem('user'))
  console.log('user', user.refresh)
  const response = await axios.post(refreshUrl, { refresh: user.refresh })
  return response.data
}


const logout = () => {
  window.localStorage.removeItem('user')
}

const getProtected = async token => {
  console.log('token', token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  console.log(config)
  const response = await axios.get(protectedUrl, config)
  return response.data
}

export default { login, getProtected, logout, refresh }