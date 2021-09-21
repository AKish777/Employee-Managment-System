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
