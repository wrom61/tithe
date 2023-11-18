const express= require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')
const routes = require('./routes/routes')
const app = express()
const PORT = 3000

dotenv.config({path: './.env'})

// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE
// })

// db.connect((error) => {
//   if(error) {
//     console.log(error)
//   } else {
//     console.log('MYSQL Connected...')
//   }
// })

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
// app.use(express.static('public'))

app.use('/', routes)




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);  
})