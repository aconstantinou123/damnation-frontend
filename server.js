const express = require('express')
const logger = require('morgan')
const path = require('path')

const app = express()

const port = 3000

app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));

app.use(express.static(path.join(__dirname, 'build')))
app.use(logger('common'))
  
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(port, () => {
  console.log(`Damnation Frontend is ready to go on port ${port}`)
})