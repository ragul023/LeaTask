create database LEA_DB;

use LEA_DB;

CREATE TABLE forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    field_name VARCHAR(100),
    label_name VARCHAR(100),
    field_value VARCHAR(100)
);
