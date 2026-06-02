CREATE DATABASE leatasks;
USE leatasks;

CREATE TABLE colleges (
    college_code INT PRIMARY KEY,
    college_name VARCHAR(300) NOT NULL
);

CREATE TABLE collegedetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_code INT NOT NULL,
    field_lable VARCHAR(200) NOT NULL,
    field_value VARCHAR(500),

    FOREIGN KEY (college_code)
    REFERENCES colleges(college_code)
    ON DELETE CASCADE
);

CREATE TABLE hosteldetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_code INT NOT NULL,
    field_lable VARCHAR(200) NOT NULL,

    boys_value VARCHAR(200) NULL,
    girls_value VARCHAR(200) NULL,

    single_value VARCHAR(200) NULL,

    FOREIGN KEY (college_code)
    REFERENCES colleges(college_code)
    ON DELETE CASCADE
);

create table bankdetails(
id int auto_increment primary key,
college_code INT NOT NULL,
field_lable VARCHAR(200) NOT NULL,
field_value VARCHAR(500) null,

    FOREIGN KEY (college_code)
    REFERENCES colleges(college_code)
    ON DELETE CASCADE
);


CREATE TABLE branchdetails (
    id INT AUTO_INCREMENT PRIMARY KEY,

    college_code INT NOT NULL,

    branch_code VARCHAR(50) NOT NULL,

    approved_intake INT NOT NULL,

    course_start_year YEAR,

    nba_accredited varchar(100),

    valid_year YEAR NULL,

    FOREIGN KEY (college_code)
    REFERENCES colleges(college_code)
    ON DELETE CASCADE
);