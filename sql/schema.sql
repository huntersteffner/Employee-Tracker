DROP DATABASE IF EXISTS organization_db;
CREATE DATABASE organization_db;

USE organization_db;

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

-- Foreign key not added in
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
);