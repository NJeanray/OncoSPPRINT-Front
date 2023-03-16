// eslint-disable-next-line import/no-mutable-exports
let URL = 'http://localhost:8000/'

if (process.env.NODE_ENV === 'production') {
  URL = process.env.REACT_APP_API_URL
}

export default URL
