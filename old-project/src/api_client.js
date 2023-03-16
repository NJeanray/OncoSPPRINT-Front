import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 100000
})

const setToken = token => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api
export { setToken }
