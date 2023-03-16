import axios from 'axios'
import host from './host'

const instance = axios.create({
  baseURL: host,
  timeout: 100000
})

instance.defaults.headers.common['Authorization'] = window.localStorage.getItem('accessToken')
  ? `Bearer ${window.localStorage.getItem('accessToken')}`
  : ''

export default instance
