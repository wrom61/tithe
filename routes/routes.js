const express = require('express')
const controller = require('../controllers/controller')
const router = express.Router()


router.get('/', (req, res) => {
  res.render('index', {title: 'Tithe'})
})

router.get('/login', (req, res) => {
  res.render('login', {title: 'Login'})
})

router.get('/register', (req, res) => {
  res.render('register', {title: 'Register'})
})

router.post('/register', controller.validation)

module.exports = router