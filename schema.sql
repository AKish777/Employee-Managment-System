DROP DATABASE IF EXISTS tracker_DB;
CREATE DATABSE tracker_DB;
USE tracker_DB;

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
VALUES ('Anthony','Panza', 1, NULL), ('Billy', 'Perry', 1, NULL), ('Adam', 'LZ', 1, NULL), ('TJ', 'Hunt', 2, 1), ('Stephon', 'Fung', 3, NULL), ('Sabrina', 'Leamon', 1, 2), ('Nicole', 'Zeifert', 3, NULL), ('Colette', 'Davis', 2, 3);