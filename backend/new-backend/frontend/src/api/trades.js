import axios from 'axios'
const tradesUrl = 'http://localhost:8000/trades/'

// extract access token from window.localStorage which is in user object

const getTrades = async () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const token = user.access
  const config = {
    headers
    : {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        }
    }
    const response = await axios.get(tradesUrl, config) 
    return response.data
}

export default { getTrades }