const express = require('express')
const cors = require('cors')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.middlewares()

    this.routes()
  }

  middlewares() {
    this.app.use( cors() )
    this.app.use( express.static('public') )
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        msg: 'get method'
      })
    })

    this.app.put('/api', (req, res) => {
      res.json({
        msg: 'put method'
      })
    })

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        msg: 'post method'
      })
    })

    this.app.delete('/api', (req, res) => {
      res.json({
        msg: 'delete method'
      })
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server on port', this.port)
    })
  }
}

module.exports = Server