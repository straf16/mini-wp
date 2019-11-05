if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')

mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MONGODB CONNECTED'))
  .catch(err => {
    console.log(err)
    console.log('FAILED TO CONNECT DB')
  })

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => console.log('SERVER RUNNING ON PORT ' + PORT))
