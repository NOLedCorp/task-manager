CREATE TABLE IF NOT EXISTS users (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255),
    Photo varchar(255) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    GitHubLink varchar(255) NOT NULL,
    ClientContact varchar(255) NOT NULL,
    File varchar(255) NULL,
    CreateUserId int(20) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT project_user_fk FOREIGN KEY(CreateUserId) REFERENCES users(Id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS roles (
	Id int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projectusers (
    Id int(20) PRIMARY KEY AUTO_INCREMENT,
	UserId int(20) NOT NULL,
    ProjectId int(20) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT projectuser_user_fk FOREIGN KEY(UserId) REFERENCES users(Id) ON DELETE RESTRICT,
    CONSTRAINT projectuser_project_fk FOREIGN KEY(ProjectId) REFERENCES projects(Id) ON DELETE CASCADE,
    UNIQUE(UserId, ProjectId)
    
);

CREATE TABLE IF NOT EXISTS projectuserrole (
    Id int(20) PRIMARY KEY AUTO_INCREMENT,
    ProjectUserId int(20) NOT NULL,
	RoleId int(20) NOT NULL,
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT projectuserrole_projectuser_fk FOREIGN KEY(ProjectUserId) REFERENCES projectusers(Id) ON DELETE CASCADE,
    CONSTRAINT projectuser_role_fk FOREIGN KEY(RoleId) REFERENCES roles(Id) ON DELETE RESTRICT
    
);