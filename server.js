const inquirer = require("inquirer");
const mysql = require("mysql2");

// Create a connection pool to the MySQL database
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "", // your_password
  database: "employee_tracker_db",
  multipleStatements: true,
});

function startApp() {
  console.log("Connecting to the database...");

  db.execute("SELECT 1", [], (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
    }

    console.log("Connected to the employee_tracker_db database.");
    mainMenu();
  });
}

// Function to execute query
function executeQuery(sql, values, callback) {
  db.execute(sql, values, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return callback(err, null);
    }

    callback(null, results);
  });
}

// Function to view all departments
function viewAllDepartments() {
  executeQuery("SELECT * FROM department", [], (err, departments) => {
    if (err) {
      return;
    }

    console.table(departments);
    mainMenu();
  });
}

// Function to view all roles
function viewAllRoles() {
  executeQuery("SELECT * FROM role", [], (err, roles) => {
    if (err) {
      return;
    }

    console.table(roles);
    mainMenu();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const sql = `
  SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title AS job_title, 
    d.name AS department, 
    r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM 
    employee e
  LEFT JOIN role r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON e.manager_id = m.id
`;
  executeQuery(sql, [], (err, employees) => {
    if (err) {
      return;
    }

    console.table(employees);
    mainMenu();
  });
}

// Function to add departments
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "Enter the name of the new department:",
    })
    .then((answers) => {
      executeQuery(
        "INSERT INTO department (name) VALUES (?)",
        [answers.departmentName],
        (err) => {
          if (err) {
            return;
          }

          console.log(
            `Department "${answers.departmentName}" added successfully!`
          );
          mainMenu();
        }
      );
    });
}

// Function to uadd roles
function addRole() {
  executeQuery("SELECT * FROM department", [], (err, departments) => {
    if (err) {
      return;
    }

    const departmentChoices = departments.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the new role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for this role:",
        },
        {
          type: "list",
          name: "departmentId",
          message: "Select the department for this role:",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        executeQuery(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answers.title, answers.salary, answers.departmentId],
          (err) => {
            if (err) {
              return;
            }

            console.log(`Role "${answers.title}" added successfully!`);
            mainMenu();
          }
        );
      });
  });
}

// Function to add employees
function addEmployee() {
  executeQuery("SELECT * FROM role", [], (err, roles) => {
    if (err) {
      return;
    }

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the employee's first name:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the employee's last name:",
        },
        {
          type: "list",
          name: "roleId",
          message: "Select the employee's role:",
          choices: roleChoices,
        },
        {
          name: "managerId",
          type: "number",
          message:
            "Enter the manager's id associated with the employee you want to add. numbers ONLY.",
        },
      ])
      .then((answers) => {
        executeQuery(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [
            answers.firstName,
            answers.lastName,
            answers.roleId,
            answers.managerId,
          ],
          (err) => {
            if (err) {
              return;
            }

            console.log(
              `Employee "${answers.firstName} ${answers.lastName}" added successfully!`
            );
            mainMenu();
          }
        );
      });
  });
}

// Function to update an employee's role
function updateEmployeeRole() {
  executeQuery("SELECT * FROM employee", [], (err, employees) => {
    if (err) {
      return;
    }

    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    executeQuery("SELECT * FROM role", [], (err, roles) => {
      if (err) {
        return;
      }

      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select the employee whose role you want to update:",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "newRoleId",
            message: "Select the new role for the employee:",
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          executeQuery(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answers.newRoleId, answers.employeeId],
            (err) => {
              if (err) {
                console.error("Error updating employee role:", err.message);
                return;
              }

              console.log("Employee role updated successfully!");
              mainMenu();
            }
          );
        });
    });
  });
}

function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee's role",
        "Exit",
      ],
    })
    .then((answers) => {
      switch (answers.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee's role":
          updateEmployeeRole();
          break;
        case "Exit":
          console.log("Goodbye!");
          db.end();
          process.exit();
      }
    });
}

startApp();
