const express= require('express')
const path = require('path')
const routes = require('./routes/routes')
const app = express()
const PORT = 3000
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)





app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);  
})