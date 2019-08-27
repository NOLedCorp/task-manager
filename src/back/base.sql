CREATE TABLE IF NOT EXISTS users (
	Id int(10) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255),
    Photo varchar(255) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP
);