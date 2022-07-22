const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const mainQuestions = require('./lib/questions')

const PORT  = process.env.PORT || 4000

const app = express()

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Connect to database
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // TODO: Add MySQL password here
//       password: 'hunter',
//       database: 'movies_db'
//     },
//     console.log(`Connected to the movies_db database.`)
//   );


  inquirer
    .prompt(mainQuestions)
    .then((data) => {
        console.log(data)
    })