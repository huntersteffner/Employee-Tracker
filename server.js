// NPM packages
const mysql = require('mysql2')
const inquirer = require('inquirer')
// Imported questions
const questions = require('./lib/questions')
// Variables that change
let departmentList = []
let roleList = []
let employeeList = ['Null']
let departmentId = ''
let roleId = ''
let managerId = ''
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
  );
// Pulls list of answers for when it asks for a list of departments
  db.query('SELECT * FROM departments', (err, res) => {
    if(err) throw err
    for (let i = 0; i < res.length; i++) {
        const string = `${res[i].name}`
        departmentList.push(string)
    }
})
// Pulls list of answers for when it asks for a list of roles
db.query('SELECT * FROM roles', (err, res) => {
  if(err) throw err
  for (let i = 0; i < res.length; i++) {
      const string = `${res[i].title}`
      roleList.push(string)
  }
})
// Pulls list of answers for when it asks for a list of employees
db.query('SELECT * FROM employees', (err, res) => {
  if(err) throw err
  for (let i = 0; i < res.length; i++) {
      const string = `${res[i].last_name}`
      employeeList.push(string)
  }
})
// Add department function
const addDepartment= () => {
  inquirer
    .prompt(questions.addDepartment)
    .then(function(res) {
      const query = 'INSERT INTO departments SET ?'
      db.query(
        query, {
          name: res.departmentName
        },
        function(err) {
          if(err) throw err
          console.table(res)
          departmentList.push(res.departmentName) //Add to list of departments
          mainMenu()
        }
      )
    })
}
// Add role function
const addRole = () => {
  inquirer
  // Questions user is prompted with
    .prompt([
      {
          name: 'roleName',
          type: 'input',
          message: 'Please enter the role that you would like to add.'
      },
      {
          name: 'salary',
          type: 'input',
          message: `What is the salary for this role?`
      },
      {
          name: 'departmentSelect',
          type: 'list',
          message: 'What deparment does this role belong to?',
          choices: departmentList //This variable is an array that has all departments inserted into it
      }
])
    .then(function(res) {
      // To confirm department id
      const sql = 'SELECT * FROM departments'
        db.query(sql, (err, results) =>{
          if(err) throw err
          console.table(results)
          for(let i =0; i<results.length; i++) {
            if(results[i].name === res.departmentSelect) {
              departmentId = results[i].id
            }
          }
          const query = 'INSERT INTO roles SET ?'
          db.query(query, {
                department_id: departmentId,
                title: res.roleName,
                salary: res.salary
              },(err) => {
            if(err) throw err
            console.table(res)
            roleList.push(res.roleName) // Add role to list of roles
            mainMenu()
          })
        })
    })
}
// Function to add employee
const addEmployee = () => {
  inquirer
  // Questions for when adding an employee
  .prompt([
    {
        name: 'fName',
        type: 'input',
        message: 'What is this employee\'s first name?'
    },
    {
        name: 'lName',
        type: 'input',
        message: 'What is this employee\'s last name?'
    },
    {
        name: 'roleSelect',
        type: 'list',
        message: 'What is this employee\'s role?',
        choices: roleList // This variable is an array with all roles
    },
    {
        name: 'managerSelect',
        type: 'list',
        message: 'What is this employee\'s manager?',
        choices: employeeList // This variable is an array with all employees
    }
])
  .then(function(res) {
    // To confirm the role id
    const sql = 'SELECT * FROM roles'
    db.query(sql, (err, results) => {
      if(err) throw err
      console.table(results)
      for(let i = 0; i<results.length; i++) {
        if(results[i].title === res.roleSelect) {
          roleId = results[i].id
      }
    }
    // To confirm the manager id
    const sql2 = 'SELECT * FROM employees'
    db.query(sql2, (err, results) => {
      if(err) throw err
      console.table(results)
      for(let i = 0; i< results.length;i++) {
        if(results[i].last_name === res.managerSelect) {
          console.log(results[i].id)
          managerId = results[i].id
        }
      }
      // Creating the new employee
      const query = 'INSERT INTO employees SET ?'
      db.query(query, {
        first_name: res.fName,
        last_name: res.lName,
        role_id: roleId,
        manager_id: managerId,
      })
    })
  })
  mainMenu()
})}
// Function to view all existing roles
const viewAllRoles = () => {
  const query = 'SELECT * FROM roles'
    db.query( query, (err, res) => {
      if(err) throw err
      console.table(res)
      mainMenu()
    })
}
// Function to view all existing employees
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
// Function to view all existing departments
const viewAllDepartments = () => {
  const query = 'SELECT * FROM departments'
    db.query( query, (err, res) => {
      if(err) throw err
      console.table(res)
      mainMenu()
    })
}
// Function that pulls user to main menu. This is the initial function and is called at the end of all other functions
const mainMenu = () => {
// Questions that user is prompted with. Switch case then determines what function will run depending on the answer the user inputs.
  inquirer
    .prompt(questions.mainQuestions)
    .then((data) => {
        switch (data.menu) {
          case 'View All Employees':
            viewAllEmployees()
            break
          case 'Add Employee':
            addEmployee()
            break
          case 'Update Employee Role':
            mainMenu()
            break
          case 'View All Roles':
            viewAllRoles()
            break
          case 'Add Role':
            addRole()
            break
          case 'View All Departments':
            viewAllDepartments()
            break
          case 'Add Departments':
            addDepartment()
            break
          case 'Quit':
            console.log('Goodbye')
            // To quit the program
            process.exit(0)
            break
        }
    })
}
// Initialize the program
console.log('Welcome to the Employee Tracker\n')
mainMenu()