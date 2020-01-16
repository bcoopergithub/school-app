const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = 5000; // 必须弄个变量PORT  = 5000 ，不要在最后写5000

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect("mongodb://localhost:27017/students-app", dbOptions, (err) => {
  if (err) {
    console.log(" Database is not connected ! ")
  } else {
    console.log(" Database is connected ! ")
  }
})

// middleware
app.use(express.json())
app.use(cors({origin: 'http://127.0.0.1:8080'}))
app.use(morgan('dev'))

app.use('/students', require('./routes/student-route')) //连接index.js和routers,/students是routes的默认endpoint

app.listen(PORT, () => console.log(`listening on port ${PORT}`)) 