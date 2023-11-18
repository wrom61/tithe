const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE,
//   multipleStatements: true
// })
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tithe_test',
  // multipleStatements: true
})
db.connect((error) => {
  if(error) {
    console.log(error)
  } else {
    console.log('MYSQL Connected...')
  }
})
exports.validation = (req, res) => {
  const {username, password, password1} = req.body
  console.log("From form:", req.body);
  
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
  console.log("Pierwsze spawdzenie: ", alerts.length);
  
  if(alerts.length === 0) {
  db.query('SELECT username FROM users WHERE username = ?', [username], async (error, results) => {
    if(error) {
      alerts.push(error.message)
      return console.log("Error: ", error.message)
    }
    console.log("results", results, results.length);
    
    if(results.length > 0) {
      alerts.push('Użytkownik o tej nazwie jest już w rejestrze!')
      console.log("Alerts2", alerts.length);
      return res.render('register', {
        alerts,
        title: 'Register'
      })
    } 
  })
  console.log("Alerts1", alerts.length);
  
} else {
    console.log('Czy jestem tu?');
    
    return res.render('register', {
      alerts,
      title: 'Register'
    })

  
  } 


 

}


