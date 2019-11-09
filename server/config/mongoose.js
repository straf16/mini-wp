const mongoose = require('mongoose')

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