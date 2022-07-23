const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const questions = require('./lib/questions')

console.log(questions.mainQuestions)

const PORT  = process.env.PORT || 4000

const app = express()

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'hunter',
      database: 'organization_db'
    },
    console.log(`Connected to the organization_db database.`)
  );



const addDepartment= () => {
  inquirer
    .prompt(questions.addDepartment)
    .then(function(res) {
      console.log(res)
      const query = 'INSERT INTO departments SET ?'
      db.query(
        query, {
          name: res.departmentName
        },
        function(err) {
          if(err) throw err
          console.table(res)
          mainMenu()
        }
      )
      mainMenu()
    })
}
const addRole = () => {
  inquirer
    .prompt(questions.addRole)
    .then((data) => {
      console.log(data)
      mainMenu()
    })
}


const mainMenu = () => {

  inquirer
    .prompt(questions.mainQuestions)
    .then((data) => {
        console.log(data)
        if(data.menu === 'Add Departments') {
          addDepartment()
        }
        if(data.menu === 'Add Role') {
          addRole()
        }
    })
}

mainMenu()