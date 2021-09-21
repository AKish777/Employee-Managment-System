DROP DATABASE IF EXISTS emptrack.db;
CREATE DATABSE emptrack.db;
USE emptrack.db

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('Customer Service'), ('Programming'), ('IT');

INSERT INTO role (title, salary, department_id)
VALUES ('Customer Service', 23.00, 1), ('Customer Service Manager', 45.00, 1), ('Technician', 35.00, 2), ('Jr. Programmer', 40.00, 3), ('Intermediate Programmer', 50.00, 3), ('Senior Programmer', 60.00, 3);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES ('Homer', 'Simpson', 1, NULL), ('Marge', 'Simpson', 1, NULL), ('Peter', 'Griffin', 2, 1), ('Lois', 'Griffin', 3, 2), ('Meg', 'Griffin', 2, 3) ('Stan','Smith', 3, NULL), ('Francine', 'Smith', 3, NULL), ('Steve', 'Smith', 3, NULL);