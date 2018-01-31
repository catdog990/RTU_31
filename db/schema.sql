CREATE DATABASE RTU_db;


USE RTU_db;

CREATE TABLE Users(  id int AUTO_INCREMENT,  PRIMARY KEY (id),  
Email varchar(50) NOT NULL,  User varchar(50) NOT NULL,  
job varchar(50) NOT NULL,  
about varchar(180),  
createdAt varchar(50),  
updatedAt varchar(50)  
)

