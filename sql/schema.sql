DROP DATABASE IF EXISTS organization_db;
CREATE DATABASE organization_db;

USE organization_db;

CREATE TABLE departments (
    id INT NOT NULL,
    dep_name VARCHAR(30)
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

-- Foreign key not added in
CREATE TABLE employees (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    
)