const questions = [
    {
        qType: 'mainQuestions',
        questions: [
            {
                name: 'menu',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee','Update Employee Role', 'View All Roles', 'Add Role','View All Departments','Add Departments','Quit']
            }
        ]
    },
    {
        qType: 'addDepartment',
        questions: [
            {
                name: 'departmentName',
                type: 'input',
                message: 'Please enter department name.'
            }
        ]
    },
    {
        qType: 'addRole',
        questions: [
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
                choices: ['Choice 1', 'Choice 2']
            }
        ]
    },
    {
        qType: 'addEmployee',
        questions: [
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
]


module.exports = questions