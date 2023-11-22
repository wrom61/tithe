const express = require('express')
const controllerRegistration = require('../controllers/controllerRegistration')
const controllerLogin = require('../controllers/controllerLogin')
const router = express.Router()


router.get('/', (req, res) => {
  res.render('index', {title: 'Dary ADS'})
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', controllerLogin.loginValidation)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', controllerRegistration.validation, controllerRegistration.register)

module.exports = router