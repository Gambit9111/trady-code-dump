import axios from 'axios'
import localforage from 'localforage'
const loginUrl = 'http://localhost:8000/auth/api/token/'
const registerUrl = 'http://localhost:8000/auth/api/register/'

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  // add username to the response
  response.data.email = credentials.email
  console.log("login", response.data)
  return response.data
}

const register = async credentials => {
  const response = await axios.post(registerUrl, credentials)
  console.log("register", response.data)
  return response.data
}

const logout = () => {
  localforage.removeItem('user')
  console.log('logout')
}

export default { login, register, logout }