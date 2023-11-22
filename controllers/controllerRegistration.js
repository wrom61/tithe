// const mysql = require('mysql');
const db = require('./controllerDbConnection')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.validation = (req, res, next) => {
  const {username, password, password1} = req.body
  let alerts = []
  

  if(!username || !password || !password1) {
    alerts.push('Proszę wypełnić wszystkie pola!')
  } else {
    if (username.length < 3) {   
    alerts.push('Nazwa użytkownika powinna mieć co najmniej 5 znaków!')
    } 
    if (password.length < 3) {   
    alerts.push('Hasło użytkownika powinno mieć co najmniej 5 znaków!')
    } else if (password != password1) {   
    alerts.push('Podane hasła nie są takie same!')
    }
  }
    
  if(alerts.length === 0) {
  db.query('SELECT username FROM users WHERE username = ?', [username], (error, results) => {
    if(error) {
      alerts.push(`Błąd połączenia z bazą danych: ${error.message}`)
      console.log("Error: ", error.message)
      return res.render('register', {
        alerts
      })
    }
       
    if(results.length > 0) {
      alerts.push('Użytkownik o tej nazwie jest już w rejestrze!')
      return res.render('register', {
        alerts
      })
    } else {
      next();
    }
  })   
  } else {    
    return res.render('register', {
      alerts
    })  
  }  
}

exports.register = async (req, res) => {
  const {username, password} = req.body
  let hashedPassword = await bcrypt.hash(password, 8);

  db.query('INSERT INTO users SET ?', 
    {username: username, password: hashedPassword},
    (error, result) => {
    if(error) {
      alerts.push(`Błąd połączenia z bazą danych: ${error.message}`)
      console.log("Error: ", error.message)
      return res.render('register', {
        alerts
      })      
    } else {
      console.log(result);
      
      return res.render('login', {
        successAlert: `Użytkownik "${username}" został dodany do rejestru!`
      })
    }
  })
}


