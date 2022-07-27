const mysql = require('mysql2')
let departmentList = []
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
// Pull questions for department
db.query('SELECT * FROM departments', (err, res) => {
    if(err) throw err
    // console.log(res)
    for (let i = 0; i < res.length; i++) {
        const string = `${res[i].name}`
        departmentList.push(string)
    }
})
// Questions to be imported
const questions = {
    mainQuestions: [
            {
                name: 'menu',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee','Update Employee Role', 'View All Roles', 'Add Role','View All Departments','Add Departments','Quit']
            }
        
    ],
    addDepartment: [
            {
                name: 'departmentName',
                type: 'input',
                message: 'Please enter department name.'
            }
        
    ],
    addRole: 
        [
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
    ],
    addEmployee: [
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
                choices: ['choice 1']
            },
            {
                name: 'managerSelect',
                type: 'list',
                message: 'What is this employee\'s manager?',
                choices: ['choice 1']
            }

    ]
}
module.exports = questions