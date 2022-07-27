INSERT INTO departments (id, name)
VALUES (1, "Senior Management"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Accounting"),
       (5, "HR");
INSERT INTO roles (department_id, title, salary)
VALUES (1, "CEO", 1000000),
       (2, "CFO", 500000),
       (2, "Salesperson", 90000),
       (3, "Senior Engineer", 150000),
       (3, "Junior Engineer", 90000),
       (4, "Lead Accountant", 160000),
       (4, "Accountant", 125000),
       (5, "HR Management", 100000),
       (5, "Hiring Manager", 60000);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Wilson", 1, null),
       ("Bob", "Forde", 2, 1),
       ("Rachel", "Smith", 3, 3),
       ("Ashley", "Simpson", 4, 1),
       ("Kevin", "Urbina", 5, 4), 
       ("Anthony", "Capalbo", 6, 1),
       ("Jessica", "Agan", 7, 5),
       ("Sara", "Bemiller", 8, 1),
       ("Kent", "Kim", 9, 6);
