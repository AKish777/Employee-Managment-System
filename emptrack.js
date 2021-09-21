const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'alexkish',
    database: 'password'
});

connection.connect(function(err) {
    if (err) throw errconsole.log('connected as id' + connection.threadId)
    startPrompt();
});

connection.connect(function(err) {
    if (err) throw errconsole.log('connected as id' + connection.threadId)
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Where would you like to go?',
            name: 'choice',
            choices: [
                'Employees List', 'Employee Departments', 'Employees Roles', 'Employee Updates', 'Add Employee', 'Add Employee Department', 'Add Role for Employee'
            ]
        }
    ])
}
