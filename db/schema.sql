CREATE DATABASE RTU_db;

USE RTU_db;


CREATE TABLE Users(
id int AUTO_INCREMENT,
PRIMARY KEY (id),
user_name varchar(50) NOT NULL,
job varchar(50) NOT NULL);
