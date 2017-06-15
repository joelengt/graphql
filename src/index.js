import path from 'path'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import loaders from './loaders'

var debug = require('debug')('riqra-service-ads:index')
var app = express()
app.use(bodyParser.json())
var port = 3000

app.use('/', cors(), graphqlHTTP((req) => {
  let baseUrl = `${req.protocol}://${req.headers.host}`

  process.env.BASE_URL = baseUrl

  return {
    schema,
    graphiql: true,
    context: {
      user: req.user,
      loaders: loaders()
    }
  }
}))

app.listen(port, (err) => {
  if (err) {
    return debug(`Error server - ${err}`)
  }
  debug(`Server Start on port ${port}`)
})
