const proxy = require('http-proxy-middleware')
const morgan = require('morgan')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      changeOrigin: true,
      target: 'http://localhost:8000'
    })
  )
  app.use(morgan('combined'))
}
