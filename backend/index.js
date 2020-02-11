const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 5000; // 必须弄个变量PORT  = 5000 ，不要在最后写5000 

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(process.env.DB_URL, dbOptions, (err) => {
  if (err) {
    console.log(' Database is not connected ! ')
  } else {
    console.log(' Database is connected ! ')
  }
})


// middleware
app.use(express.json()) // parse req.body as json 
app.use('/students', require('./routes/student-route')) //连接index.js和routers,/students是routes的默认endpoint

app.use(morgan('dev'))
app.use(cors())

app.listen(PORT, () => console.log(`listening on port ${PORT}`)) 


