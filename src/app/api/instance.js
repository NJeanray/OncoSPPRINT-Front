import axios from 'axios'
import host from './host'

const instance = axios.create({
  baseURL: host
})

const accessToken = window.localStorage.getItem('accessToken')

instance.defaults.headers.common.Authorization = accessToken ? `Bearer ${accessToken}` : null

export default instance
