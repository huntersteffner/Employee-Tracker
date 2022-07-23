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
    .then((res) => {
      
      const query = 'INSERT INTO roles SET ?'
      db.query(
        query, {
          title: res.roleName,
          salary: res.salary
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
const viewAllRoles = () => {
  const query = 'SELECT * FROM roles'
    db.query( query, (err, res) => {
      if(err) throw err
      console.table(res)
      mainMenu()
    })
}
const viewAllEmployees = () => {
  const query = 'SELECT * FROM employees'
      db.query( query,
        function(err, res) {
          if(err) throw err
          console.table(res)
          mainMenu()
        }
      )
}
const viewAllDepartments = () => {
  const query = 'SELECT * FROM departments'
    db.query( query, (err, res) => {
      if(err) throw err
      console.table(res)
      mainMenu()
    })
}


const mainMenu = () => {

  inquirer
    .prompt(questions.mainQuestions)
    .then((data) => {
        switch (data.menu) {
          case 'View All Employees':
            viewAllEmployees()
            break
          case 'Add Employee':
            // Not complete
            mainMenu()
            break
          case 'Update Employee Role':
            // Not complete
            mainMenu()
            break
          case 'View All Roles':
            viewAllRoles()
            break
          case 'Add Role':
            // Not fully working
            addRole()
            break
          case 'View All Departments':
            viewAllDepartments()
            break
          case 'Add Departments':
            addDepartment()
            break
          case 'Quit':
            // Doesn't quit yet
            console.log('Goodbye')
            break

        }
    })
}

mainMenu()