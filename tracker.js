const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'tracker_DB'
});

connection.connect(function(err) {
  if (err) throw err
  console.log("Connected as Id" + connection.threadId)
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
    ]).then(function(val) {
        switch (val.choice) {
            case "Employees List":
              viewAllEmployees();
              break;

            case "Employee Departments":
              viewAllDepartments();
              break;

            case "Employees Roles":
                viewAllRoles();
              break;
          
            case "Employee Updates":
                addEmployee();
              break;
    
            case "Add Employee":
                updateEmployee();
              break;

            case "Add Employee Department":
                addDepartment();
              break;
      
            case "Add Role for Employee":
                addRole();
              break;    
        }
    })
};

function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
};

function viewAllRoles() {
    connection.query('SELECT employee.first_name, employee.last_name, role.title AS TITLE FROM employee JOIN role ON employee.role_id = role.id;',
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
};

function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
};

function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'FIRST name of new Employee',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'LAST name of new employee',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Employees role id?',
            name: 'addEmployRole'
        },
        {
            type: 'input',
            message: 'Employees manger id?',
            name: 'addManager'
        }
    ]).then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const employRoleID = res.addEmployRole;
        const employManID = res.addManager;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}" "${employManID}")`;
        connection.query(query, function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res);
            startPrompt()
        })
    })
};

function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
     inquirer
     .prompt([
       {
         type: "input",
         message: "Enter the employee's ID that you want to update",
         name: "updateEmploy"
       },
       {
         type: "input",
         message: "Enter the role ID for the selected employee",
         name: "newRole"
       }
     ])
     .then(function (res) {
         const updateEmploy = res.updateEmploy;
         const newRole = res.newRole;
         const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
         connection.query(queryUpdate, function (err, res) {
           if (err) {
             throw err;
           }
           console.table(res);
            startPrompt()
        }) 
    });
  });

};

function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the Title of the role?"
          },
          {
            name: "Salary",
            type: "input",
            message: "Choose the Salary?"
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
      });
    });
};

function addDepartment() { 
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What kind of Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
};