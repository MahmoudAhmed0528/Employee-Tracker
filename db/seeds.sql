
INSERT INTO department (name)
VALUES ("Web Development"),
       ("Sales"),
       ("Quality Assurance"),
       ("Human Resources");


INSERT INTO role (title, salary, department_id)
VALUES ("Front-end Developer", 1000, 1),
       ("Back-end Developer", 2000, 1),
       ("Sales Representative", 1000, 2),
       ("Manager", 2000, 2),
       ("QA Engineer", 1500, 3),
       ("HR Specialist", 1800, 4),
       ("Software Architect", 2500, 1),
       ("Marketing Coordinator", 1700, 2);



INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "Alex", "P", 3),
       (6, "Michael", "S", 3),
       (4, "Mira", "L", null),
       (5, "Lisa", "M", 3),
       (3, "Nika", "L", 2),
       (7, "Sarah", "T", 2),
       (2, "Dina", "L", 5),
       (8, "Jake", "H", 2),
       (1, "Victor", "P",1),
       (1, "Emily", "L", 1);

