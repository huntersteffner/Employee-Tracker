SELECT * FROM roles JOIN departments ON roles.department_id = departments.id;

SELECT * FROM roles;

SELECT * FROM departments;

-- SELECT department_id, title FROM roles JOIN departments ON roles.department_id = departments.id WHERE departments.name = "Sales";
