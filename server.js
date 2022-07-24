const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const questions = require('./lib/questions')

// console.log(questions.mainQuestions)

const PORT  = process.env.PORT || 4000

const app = express()

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


departmentList = ['1 Board', '2 Sales', '3 Engineering', '4 Finance', '5 Legal']
// console.log(departmentList)

let departmentId = ''

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
  // db.query('SELECT department_id, title FROM roles JOIN departments ON roles.department_id = departments.id WHERE departments.name = "Sales"'), function(err, results) {
  //   console.table(results)
  // }

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
    .then(function(res) {
      console.log(res)
      const sql = 'SELECT * FROM departments'
        db.query(sql, (err, results) =>{
          if(err) throw err
          console.table(results)
          for(let i =0; i<results.length; i++) {
            if(results[i].name === res.departmentSelect) {
              departmentId = results[i].id
            }
          }
          console.log(departmentId)
          const query = 'INSERT INTO roles SET ?'
          db.query(query, {
                department_id: departmentId,
                title: res.roleName,
                salary: res.salary
              },(err) => {
            if(err) throw err
            console.table(res)
            mainMenu()
          })
        })
      // const query = 'INSERT INTO roles SET ?'
      // db.query(
      //   query, {
      //     department_id: departmentList,
      //     title: res.roleName,
      //     salary: res.salary
      //   },
      //   function(err) {
      //     if(err) throw err
      //     console.table(res)
      //     mainMenu()
      //   }
      // )
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