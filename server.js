const mysql = require('mysql2')
const inquirer = require('inquirer')

const questions = require('./lib/questions')



let departmentList = []
let roleList = []
let employeeList = ['Null']

// console.log(departmentList)




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
    console.log(`Connected to the organization_db database.`)
  );

  db.query('SELECT * FROM departments', (err, res) => {
    if(err) throw err
    for (let i = 0; i < res.length; i++) {
        const string = `${res[i].name}`
        departmentList.push(string)
    }
})

db.query('SELECT * FROM roles', (err, res) => {
  if(err) throw err
  for (let i = 0; i < res.length; i++) {
      const string = `${res[i].title}`
      roleList.push(string)
  }
})
db.query('SELECT * FROM employees', (err, res) => {
  if(err) throw err
  for (let i = 0; i < res.length; i++) {
      const string = `${res[i].last_name}`
      employeeList.push(string)
  }
})


const addDepartment= () => {
  inquirer
    .prompt(questions.addDepartment)
    .then(function(res) {
      // console.log(res)
      const query = 'INSERT INTO departments SET ?'
      db.query(
        query, {
          name: res.departmentName
        },
        function(err) {
          if(err) throw err
          console.table(res)
          departmentList.push(res.departmentName)
          mainMenu()
        }
      )
      // mainMenu()
    })
}
const addRole = () => {
  inquirer
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
          choices: departmentList
      }
])
    .then(function(res) {
      // console.log(res)
      const sql = 'SELECT * FROM departments'
        db.query(sql, (err, results) =>{
          if(err) throw err
          console.table(results)
          for(let i =0; i<results.length; i++) {
            if(results[i].name === res.departmentSelect) {
              departmentId = results[i].id
            }
          }
          // console.log(departmentId)
          const query = 'INSERT INTO roles SET ?'
          db.query(query, {
                department_id: departmentId,
                title: res.roleName,
                salary: res.salary
              },(err) => {
            if(err) throw err
            console.table(res)
            roleList.push(res.roleName)
            mainMenu()
          })
        })
      
      // mainMenu()
    })
}
const addEmployee = () => {
  inquirer
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
        choices: roleList
    },
    {
        name: 'managerSelect',
        type: 'list',
        message: 'What is this employee\'s manager?',
        choices: employeeList
    }

])
  .then(function(res) {
    const sql = 'SELECT * FROM roles'
    db.query(sql, (err, results) => {
      if(err) throw err
      console.table(results)
      for(let i = 0; i<results.length; i++) {
        if(results[i].title === res.roleSelect) {
          roleId = results[i].id
      }
    }
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
const updateEmployee = () => {
  const query = ``
  db.query

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
            addEmployee()
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
            console.log('Goodbye')
            process.exit(0)
            break

        }
    })
}

mainMenu()